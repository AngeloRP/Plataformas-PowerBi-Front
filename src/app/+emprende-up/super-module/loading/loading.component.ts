import { OnInit, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-loading',
    styleUrls: ['./loading.component.css'],
    templateUrl: './loading.component.html',
    encapsulation: ViewEncapsulation.None
})
export class LoadingComponent implements OnInit {
    ngOnInit() {
    }
}
