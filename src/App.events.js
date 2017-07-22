import {Subject} from "rxjs";

export const events$ = new Subject();
export const emit = (action) => events$.next(action);
