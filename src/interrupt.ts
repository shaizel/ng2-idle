import {Subscription} from 'rxjs/Rx';

import {InterruptArgs} from './interruptargs';
import {InterruptSource} from './interruptsource';

/*
 * A class for managing an interrupt from an interrupt source.
 */
export class Interrupt {
  private sub: Subscription<any>;

  constructor(public source: InterruptSource) {}

  /*
   * Subscribes to the interrupt using the specified function.
   * @param fn - The subscription function.
   */
  subscribe(fn: (args: InterruptArgs) => void): void {
    this.sub = this.source.onInterrupt.subscribe(fn);
  }

  /*
   * Unsubscribes the interrupt.
   */
  unsubscribe(): void {
    this.sub.unsubscribe();
    this.sub = null;
  }

  /*
   * Keeps the subscription but resumes interrupt events.
   */
  resume(): void { this.source.attach(); }

  /*
   * Keeps the subscription but halts interrupt events.
   */
  pause(): void { this.source.detach(); }
}
