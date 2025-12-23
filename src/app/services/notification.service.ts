import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

export type NotificationType = 'cotizacion_pendiente' | 'oc_pendiente';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  link: string;
  createdAt: string; // ISO
  targetProfileIds: number[];
  readByUserIds: number[];
  dedupeKey?: string;
}

export interface CreateNotificationInput {
  type: NotificationType;
  title: string;
  body: string;
  link: string;
  targetProfileIds: number[];
  dedupeKey?: string;
}

@Injectable()
export class NotificationService {
  private readonly storageKey = 'app_notifications_v1';
  private readonly subject = new BehaviorSubject<AppNotification[]>(this.load());

  notifications$ = this.subject.asObservable();

  push(input: CreateNotificationInput): AppNotification {
    const list = this.subject.getValue();

    if (input.dedupeKey) {
      const existingIndex = list.findIndex(n => n.dedupeKey === input.dedupeKey);
      if (existingIndex !== -1) {
        const existing = list[existingIndex];
        const updated: AppNotification = {
          ...existing,
          type: input.type,
          title: input.title,
          body: input.body,
          link: input.link,
          targetProfileIds: input.targetProfileIds || [],
          createdAt: new Date().toISOString(),
          // Si cambia el contenido, vuelve a considerarse "nuevo" para todos
          readByUserIds: [],
        };

        const next = [updated, ...list.filter((_, i) => i !== existingIndex)];
        this.save(next);
        this.subject.next(next);
        return updated;
      }
    }

    const notification: AppNotification = {
      id: this.newId(),
      type: input.type,
      title: input.title,
      body: input.body,
      link: input.link,
      createdAt: new Date().toISOString(),
      targetProfileIds: input.targetProfileIds || [],
      readByUserIds: [],
      dedupeKey: input.dedupeKey
    };

    const next = [notification, ...list];
    this.save(next);
    this.subject.next(next);
    return notification;
  }

  removeByDedupeKey(dedupeKey: string) {
    const list = this.subject.getValue();
    const next = list.filter(n => n.dedupeKey !== dedupeKey);
    if (next.length === list.length) return;
    this.save(next);
    this.subject.next(next);
  }

  watchForUser(userId: number, profileIds: number[]): Observable<AppNotification[]> {
    const profiles = profileIds || [];
    return this.notifications$.map(list => {
      const filtered = list
        .filter(n => this.intersects(n.targetProfileIds, profiles))
        .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

      // De-dup defensivo por id
      const seen: { [id: string]: true } = {};
      return filtered.filter(n => (seen[n.id] ? false : (seen[n.id] = true)));
    });
  }

  getUnreadCountForUser(userId: number, profileIds: number[]): number {
    const profiles = profileIds || [];
    return this.subject
      .getValue()
      .filter(n => this.intersects(n.targetProfileIds, profiles))
      .filter(n => !this.isReadByUser(n, userId)).length;
  }

  markAsRead(id: string, userId: number) {
    const list = this.subject.getValue();
    const idx = list.findIndex(n => n.id === id);
    if (idx === -1) return;

    const n = list[idx];
    if (this.isReadByUser(n, userId)) return;

    const updated: AppNotification = {
      ...n,
      readByUserIds: [...(n.readByUserIds || []), userId]
    };

    const next = [...list.slice(0, idx), updated, ...list.slice(idx + 1)];
    this.save(next);
    this.subject.next(next);
  }

  markAllAsRead(userId: number, profileIds: number[]) {
    const profiles = profileIds || [];
    const list = this.subject.getValue();

    const next = list.map(n => {
      if (!this.intersects(n.targetProfileIds, profiles)) return n;
      if (this.isReadByUser(n, userId)) return n;
      return { ...n, readByUserIds: [...(n.readByUserIds || []), userId] };
    });

    this.save(next);
    this.subject.next(next);
  }

  isReadByUser(notification: AppNotification, userId: number): boolean {
    return (notification.readByUserIds || []).includes(userId);
  }

  private intersects(a: number[], b: number[]): boolean {
    if (!a || !b || a.length === 0 || b.length === 0) return false;
    const setB: { [k: number]: true } = {};
    b.forEach(x => (setB[x] = true));
    return a.some(x => !!setB[x]);
  }

  private newId(): string {
    return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
  }

  private load(): AppNotification[] {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];

      return parsed
        .filter(Boolean)
        .map((n: any) => ({
          id: String(n.id),
          type: n.type as NotificationType,
          title: String(n.title || ''),
          body: String(n.body || ''),
          link: String(n.link || ''),
          createdAt: String(n.createdAt || new Date().toISOString()),
          targetProfileIds: Array.isArray(n.targetProfileIds) ? n.targetProfileIds.map(Number) : [],
          readByUserIds: Array.isArray(n.readByUserIds) ? n.readByUserIds.map(Number) : [],
          dedupeKey: n.dedupeKey ? String(n.dedupeKey) : undefined
        }));
    } catch (e) {
      return [];
    }
  }

  private save(list: AppNotification[]) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(list));
    } catch (e) {
      // ignore
    }
  }
}
