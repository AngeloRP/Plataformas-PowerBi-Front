import {
  Directive, OnInit, ElementRef, AfterContentChecked, AfterViewChecked, AfterViewInit,
  AfterContentInit
} from '@angular/core';

import 'script-loader!smartadmin-plugins/bower_components/jquery.easy-pie-chart/dist/jquery.easypiechart.min.js';
import { Output, EventEmitter } from '@angular/core';

declare var $: any;

@Directive({
  selector: '[saEasyPieChartContainer]'
})
export class EasyPieChartContainer implements AfterContentChecked, AfterContentInit {
  @Output() terminoCarga: EventEmitter<boolean>;
  constructor(private container: ElementRef) {
    this.terminoCarga = new EventEmitter<boolean>();
  }

  render() {

    $('.easy-pie-chart', this.container.nativeElement).each((idx, element) => {

      const $this = $(element),
        barColor = $this.css('color') || $this.data('pie-color'),
        trackColor = $this.data('pie-track-color') || 'rgba(0,0,0,0.04)',
        size = parseInt($this.data('pie-size')) || 25;

      $this.easyPieChart({

        barColor: barColor,
        trackColor: trackColor,
        scaleColor: false,
        lineCap: 'butt',
        lineWidth: size / 8.5,
        animate: 1500,
        rotate: -90,
        size: size,
        onStep: function (from, to, percent) {
          $(this.el).find('.percent').text(Math.round(percent));
        }

      });
      // $this.easyPieChart.div.div.div.button.span.css({ 'top': ($('#porcentaje_grafica').height() + 6) + 'px' });
      this.terminoCarga.emit(true);
    });

  }

  private counter = 0;

  ngAfterContentChecked() {
    let counter = $('.easy-pie-chart').length;
    if (counter != this.counter) {
      this.counter = counter;
      setTimeout(() => {
        this.render()
      }, 10)
    }

  }

  ngAfterContentInit() {
    this.render()
  }



}
