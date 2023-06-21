import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [],
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private debouncerSuscription?: Subscription;
  private debouncer: Subject<string> = new Subject<string>();

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter();

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
      .pipe(debounceTime(300))
      .subscribe((value) => {
        this.onDebounce.emit(value);
        console.log('ji');
      });
  }

  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
    console.log('d');
  }
  // emitSearch(value: string): void {
  //   this.onDebounce.emit(value);
  // }

  onKeyPress(searchTerm: string): void {
    this.debouncer.next(searchTerm);
  }
}
