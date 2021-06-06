import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.css']
})
export class ThumbnailComponent  {

    @Input()
    public imageSource: string;

    @Input()
    public imageWidth: number;

    @Input()
    public imageHeight: number;

    @Output()
    public userEntersMe = new EventEmitter<string>();

    public onMouseEnter():void{
        this.userEntersMe.emit(this.imageSource);
    }
  

    @Output()
    public userLeavesMe = new EventEmitter<string>();

    public onMouseLeave():void{
        this.userLeavesMe.emit(this.imageSource);
    }

}
