import {
  Component,
  Input,
  forwardRef,
  HostListener,
  ElementRef,
  Output,
  EventEmitter,
  ViewChild,
  OnInit
} from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { DropdownValuesService } from "../../@core/mock/marchandizer/dropdown-values.service";
import { LanguageConverterService } from "../../@core/mock/marchandizer/language-converter.service";
@Component({
  selector: 'search-dropdown',
  templateUrl: './search-dropdown.component.html',
  styleUrls: ['./search-dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchDropdownComponent),
      multi: true
    }
  ]
})
export class SearchDropdownComponent implements ControlValueAccessor {
  list = [];
  temp_list = [];
  keyword = "";
  _img: any;
  _label: any;
  _uid: any;
  @Output() afterChange = new EventEmitter();
  @ViewChild("input", { static: false }) input: ElementRef;
  @Input("size") size;
  @Input("items") set items(value) {
    this.list = value;
    this.temp_list = value;
  }
  @Input("img") img;
  @Input("label") label;
  @Input("uid") uid;
  onChange: any = () => { };
  onTouch: any = () => { };
  value: any = `${this.languageService.productEntry.productCategory} ${this.languageService.productEntry.Select}`;
   
  shown = false;
  constructor(private ele: ElementRef,
    private dropdownValuesService:DropdownValuesService,
    public languageService:LanguageConverterService, ) {
  }
  ngOnChanges() {
    this._label = (typeof this.label !== 'undefined' && this.label !== '') ? this.label : 'name';
    this._img = (typeof this.img !== 'undefined' && this.img !== '') ? this.img : 'img';
    this._uid = (typeof this.uid !== 'undefined' && this.uid !== '') ? this.uid : 'id';
    this.value = `${this.languageService.productEntry.productCategory} ${this.languageService.productEntry.Select}`;
  }
  writeValue(value) {
    if (value) {
      this.temp_list.map(x => {
        if (x[this._uid] == value) {
          this.value = x[this._label];
        }
      })
    }
  }
  registerOnChange(fn: any) {
    this.onChange = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }
  search(e) {
    const val = e.toLowerCase();
    console.log('val',val)
    console.log('temp_list',this.temp_list)
    let temp = (val) ?
    this.temp_list.filter(p => p[this._label].toLowerCase()
    .includes(val.toLowerCase())) :
     this.temp_list;      
     this.list=temp;
     if(this.list.length<=0){
      this.list=this.temp_list;
      this.keyword='';
     }

     console.log('list',this.list)

    // const temp = this.temp_list.filter(x => {
    //   console.log(x[this._label].toLowerCase().indexOf(val))
    //   if (x[this._label].toLowerCase().indexOf(val) !== -1) {
    //     return x;
    //   }else{
    //     this.list = this.temp_list;
    //   }
    // });
    // this.list = temp;
  }
  private _filter(value: any): any[] {
    const filterValue = value.toLowerCase();

    return this.temp_list.filter(option => option._label.toLowerCase().indexOf(filterValue) === 0);
  }
  select(item) {
    this.onChange(item[this._label]);
    this.value = item[this._label];
    this.shown = false;
    this.afterChange.emit(item);
    this.dropdownValuesService.OnCategoryDDLChange(item.ProductName);
  }
  show() {
    this.shown = this.shown ? false : true;
    setTimeout(() => {
      this.input.nativeElement.focus();
    }, 200);
  }
  @HostListener("document:click", ["$event"]) onClick(e) {
    if (!this.ele.nativeElement.contains(e.target)) {
      this.shown = false;
    }
  }
}
