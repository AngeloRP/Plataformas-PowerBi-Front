import { Directive, ElementRef, OnInit, Input, Output, EventEmitter } from '@angular/core';

declare var $: any;

@Directive({
  selector: '[saUiDatepicker]'
})
export class UiDatepickerDirective implements OnInit {

  @Input() saUiDatepickerInput: any;
  @Output() fechaNueva: EventEmitter<any>;
  constructor(private el: ElementRef) {
    this.fechaNueva =  new EventEmitter<any>();
  }

  ngOnInit() {
    const onSelectCallbacks = [];
    const saUiDatepicker = this.saUiDatepickerInput || {};
    const element = $(this.el.nativeElement);
    /*if (saUiDatepicker.defaultDate !== null) {
      onSelectCallbacks.push((selectedDate) => {
        $(saUiDatepicker.defaultDate).datepicker('option', 'defaultDate', selectedDate);
      });
    } else {
      onSelectCallbacks.push((selectedDate) => {
        $(saUiDatepicker.defaultDate).datepicker('option', 'defaultDate', selectedDate);
      });
    }
    if (saUiDatepicker.format) {
      onSelectCallbacks.push((selectedDate) => {
        $(saUiDatepicker.dateFormat).datepicker('option', 'dateFormat', selectedDate);
      });
    }*/
    if (saUiDatepicker.minRestrict) {
      onSelectCallbacks.push((selectedDate) => {
        $(saUiDatepicker.minRestrict).datepicker('option', 'minDate', selectedDate);
      });
    }
    if (saUiDatepicker.maxRestrict) {
      onSelectCallbacks.push((selectedDate) => {
        $(saUiDatepicker.maxRestrict).datepicker('option', 'maxDate', selectedDate);
      });
    }

    // Let others know about changes to the data field
    onSelectCallbacks.push((selectedDate) => {
      element.triggerHandler('change');
      console.log('Select Date:' + JSON.stringify(selectedDate));
      this.fechaNueva.emit(selectedDate);
      let form = element.closest('form');

      if (typeof form.bootstrapValidator == 'function') {
        try {
          form.bootstrapValidator('revalidateField', element);
        } catch (e) {
          // console.log(e.message)
        }
      }
    });

    const options = $.extend(saUiDatepicker, {
      prevText: '<i class="fa fa-chevron-left"></i>',
      nextText: '<i class="fa fa-chevron-right"></i>',
      defaultDate: this.saUiDatepickerInput.defaultDate,
      dateFormat: this.saUiDatepickerInput.dateFormat,
      onSelect: (selectedDate) => {
        onSelectCallbacks.forEach((callback) => {
          callback.call(callback, selectedDate)
        })
      }
    });

    element.datepicker(options);


  }


}
