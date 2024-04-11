import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NgControlStatus,
  NgModel
} from "./chunk-D7KMPT5E.js";
import {
  CommonModule,
  NgClass,
  NgForOf,
  NgIf,
  NgTemplateOutlet
} from "./chunk-PBQIWVFV.js";
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Injectable,
  Input,
  NgModule,
  Output,
  Pipe,
  ViewChild,
  ViewChildren,
  forwardRef,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdefinePipe,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵpipeBind3,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-Z7XMWPEY.js";
import "./chunk-GFVJDENN.js";
import "./chunk-QOAHSALO.js";
import "./chunk-LOA65BFQ.js";
import {
  __spreadValues
} from "./chunk-ASLTLD6L.js";

// node_modules/ngx-select-dropdown/fesm2020/ngx-select-dropdown.mjs
var _c0 = ["dropdownList"];
var _c1 = ["availableOption"];
var _c2 = (a0) => ({
  "ngx-disabled": a0
});
function NgxSelectDropdownComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 7);
    ɵɵlistener("click", function NgxSelectDropdownComponent_div_1_Template_div_click_0_listener() {
      ɵɵrestoreView(_r12);
      const ctx_r11 = ɵɵnextContext();
      return ɵɵresetView(ctx_r11.openSelectDropdown());
    });
    ɵɵelementContainer(1, 8);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    const _r10 = ɵɵreference(11);
    ɵɵproperty("ngClass", ɵɵpureFunction1(2, _c2, ctx_r0.disabled));
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.dropdownButtonTemplate || _r10);
  }
}
function NgxSelectDropdownComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 7);
    ɵɵlistener("click", function NgxSelectDropdownComponent_div_2_Template_div_click_0_listener() {
      ɵɵrestoreView(_r14);
      const ctx_r13 = ɵɵnextContext();
      return ɵɵresetView(ctx_r13.closeSelectDropdown());
    });
    ɵɵelementContainer(1, 8);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    const _r10 = ɵɵreference(11);
    ɵɵproperty("ngClass", ɵɵpureFunction1(2, _c2, ctx_r1.disabled));
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.dropdownButtonTemplate || _r10);
  }
}
var _c3 = (a0) => ({
  active: a0
});
function NgxSelectDropdownComponent_div_3_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 17)(1, "input", 18);
    ɵɵlistener("change", function NgxSelectDropdownComponent_div_3_div_2_Template_input_change_1_listener($event) {
      ɵɵrestoreView(_r22);
      const ctx_r21 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r21.changeSearchText($event));
    })("input", function NgxSelectDropdownComponent_div_3_div_2_Template_input_input_1_listener() {
      ɵɵrestoreView(_r22);
      const ctx_r23 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r23.searchTextChanged());
    });
    ɵɵtwoWayListener("ngModelChange", function NgxSelectDropdownComponent_div_3_div_2_Template_input_ngModelChange_1_listener($event) {
      ɵɵrestoreView(_r22);
      const ctx_r24 = ɵɵnextContext(2);
      ɵɵtwoWayBindingSet(ctx_r24.searchText, $event) || (ctx_r24.searchText = $event);
      return ɵɵresetView($event);
    });
    ɵɵelementEnd();
    ɵɵelementStart(2, "label", 19);
    ɵɵelement(3, "span", 20);
    ɵɵtext(4);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r16 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵstyleProp("direction", ctx_r16.config.inputDirection);
    ɵɵtwoWayProperty("ngModel", ctx_r16.searchText);
    ɵɵadvance();
    ɵɵproperty("ngClass", ɵɵpureFunction1(5, _c3, ctx_r16.searchText));
    ɵɵadvance(2);
    ɵɵtextInterpolate1(" ", ctx_r16.config.searchPlaceholder, "");
  }
}
function NgxSelectDropdownComponent_div_3_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div")(1, "div", 21)(2, "label", 22);
    ɵɵlistener("click", function NgxSelectDropdownComponent_div_3_div_3_Template_label_click_2_listener() {
      ɵɵrestoreView(_r26);
      const ctx_r25 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r25.toggleSelectAll(true, true));
    });
    ɵɵelementStart(3, "input", 23);
    ɵɵtwoWayListener("ngModelChange", function NgxSelectDropdownComponent_div_3_div_3_Template_input_ngModelChange_3_listener($event) {
      ɵɵrestoreView(_r26);
      const ctx_r27 = ɵɵnextContext(2);
      ɵɵtwoWayBindingSet(ctx_r27.selectAll, $event) || (ctx_r27.selectAll = $event);
      return ɵɵresetView($event);
    });
    ɵɵelementEnd();
    ɵɵelementStart(4, "span");
    ɵɵtext(5);
    ɵɵelementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r17 = ɵɵnextContext(2);
    ɵɵadvance(3);
    ɵɵtwoWayProperty("ngModel", ctx_r17.selectAll);
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r17.config.selectAllLabel);
  }
}
var _c4 = (a0, a1) => ({
  item: a0,
  config: a1
});
function NgxSelectDropdownComponent_div_3_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r31 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 24);
    ɵɵlistener("click", function NgxSelectDropdownComponent_div_3_div_5_Template_div_click_0_listener() {
      const restoredCtx = ɵɵrestoreView(_r31);
      const selected_r28 = restoredCtx.$implicit;
      const i_r29 = restoredCtx.index;
      const ctx_r30 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r30.deselectItem(selected_r28, i_r29));
    })("mousedown", function NgxSelectDropdownComponent_div_3_div_5_Template_div_mousedown_0_listener() {
      ɵɵrestoreView(_r31);
      const ctx_r32 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r32.optionMouseDown = true);
    });
    ɵɵelementContainer(1, 25);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const selected_r28 = ctx.$implicit;
    const ctx_r18 = ɵɵnextContext(2);
    const _r8 = ɵɵreference(9);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r18.selectedItemTemplate || _r8)("ngTemplateOutletContext", ɵɵpureFunction2(2, _c4, selected_r28, ctx_r18.config));
  }
}
function NgxSelectDropdownComponent_div_3_hr_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "hr");
  }
}
var _c5 = (a0, a1) => ({
  active: a0,
  disabled: a1
});
function NgxSelectDropdownComponent_div_3_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r37 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 26, 27);
    ɵɵlistener("click", function NgxSelectDropdownComponent_div_3_div_8_Template_div_click_0_listener() {
      const restoredCtx = ɵɵrestoreView(_r37);
      const item_r33 = restoredCtx.$implicit;
      const i_r34 = restoredCtx.index;
      const ctx_r36 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r36.selectItem(item_r33, i_r34));
    })("mousedown", function NgxSelectDropdownComponent_div_3_div_8_Template_div_mousedown_0_listener() {
      ɵɵrestoreView(_r37);
      const ctx_r38 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r38.optionMouseDown = true);
    });
    ɵɵelementContainer(2, 25);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const item_r33 = ctx.$implicit;
    const i_r34 = ctx.index;
    const ctx_r20 = ɵɵnextContext(2);
    const _r6 = ɵɵreference(7);
    ɵɵproperty("ngClass", ɵɵpureFunction2(3, _c5, ctx_r20.focusedItemIndex == i_r34 && !item_r33.disabled, item_r33.disabled));
    ɵɵadvance(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r20.optionItemTemplate || _r6)("ngTemplateOutletContext", ɵɵpureFunction2(6, _c4, item_r33, ctx_r20.config));
  }
}
function NgxSelectDropdownComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 9, 10);
    ɵɵtemplate(2, NgxSelectDropdownComponent_div_3_div_2_Template, 5, 7, "div", 11)(3, NgxSelectDropdownComponent_div_3_div_3_Template, 6, 2, "div", 12);
    ɵɵelementStart(4, "div", 13);
    ɵɵtemplate(5, NgxSelectDropdownComponent_div_3_div_5_Template, 2, 5, "div", 14);
    ɵɵelementEnd();
    ɵɵtemplate(6, NgxSelectDropdownComponent_div_3_hr_6_Template, 1, 0, "hr", 12);
    ɵɵelementStart(7, "div", 15);
    ɵɵtemplate(8, NgxSelectDropdownComponent_div_3_div_8_Template, 3, 9, "div", 16);
    ɵɵpipe(9, "limitTo");
    ɵɵpipe(10, "filterBy");
    ɵɵelementContainer(11, 8);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    const _r4 = ɵɵreference(5);
    ɵɵstyleProp("max-height", ctx_r2.config.height)("top", ctx_r2.top);
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r2.config.search);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.config.enableSelectAll && ctx_r2.multiple);
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", ctx_r2.selectedItems);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.selectedItems.length > 0 && ctx_r2.availableItems.length > 0);
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", ɵɵpipeBind2(9, 10, ɵɵpipeBind3(10, 13, ctx_r2.availableItems, ctx_r2.searchText, ctx_r2.config.searchOnKey), ctx_r2.config.limitTo));
    ɵɵadvance(3);
    ɵɵproperty("ngTemplateOutlet", ctx_r2.notFoundTemplate || _r4);
  }
}
function NgxSelectDropdownComponent_ng_template_4_div_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div");
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r39 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r39.config.noResultsFound);
  }
}
function NgxSelectDropdownComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, NgxSelectDropdownComponent_ng_template_4_div_0_Template, 2, 1, "div", 12);
  }
  if (rf & 2) {
    const ctx_r3 = ɵɵnextContext();
    ɵɵproperty("ngIf", ctx_r3.showNotFound);
  }
}
function NgxSelectDropdownComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span");
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const item_r40 = ctx.item;
    const config_r41 = ctx.config;
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", config_r41.displayFn ? config_r41.displayFn(item_r40) : item_r40[config_r41.displayKey] || item_r40, " ");
  }
}
function NgxSelectDropdownComponent_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 28);
    ɵɵtext(1, "x");
    ɵɵelementEnd();
    ɵɵelementStart(2, "span");
    ɵɵtext(3);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const item_r42 = ctx.item;
    const config_r43 = ctx.config;
    ɵɵadvance(3);
    ɵɵtextInterpolate1(" ", config_r43.displayFn ? config_r43.displayFn(item_r42) : item_r42[config_r43.displayKey] || item_r42, " ");
  }
}
var _c6 = (a0) => ({
  "up": a0
});
function NgxSelectDropdownComponent_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "button", 29)(1, "span", 30);
    ɵɵtext(2);
    ɵɵelementEnd();
    ɵɵelement(3, "span", 31);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r9 = ɵɵnextContext();
    ɵɵproperty("ngClass", ɵɵpureFunction1(4, _c2, ctx_r9.disabled))("disabled", ctx_r9.disabled);
    ɵɵadvance(2);
    ɵɵtextInterpolate1("", ctx_r9.selectedDisplayText, " ");
    ɵɵadvance();
    ɵɵproperty("ngClass", ɵɵpureFunction1(6, _c6, ctx_r9.toggleDropdown));
  }
}
var SelectDropDownService = class {
  constructor() {
    this.openDropdownInstance = new EventEmitter();
    this.closeDropdownInstance = new EventEmitter();
    this.openInstances = [];
  }
  isOpen(instanceId) {
    return this.openInstances.indexOf(instanceId) > -1;
  }
  /**
   * @summary: Open a specific dropdown instance based on the instance ID.
   * @param instanceId: Instance id of the dropdown that must be opened.
   */
  openDropdown(instanceId) {
    this.openDropdownInstance.emit(instanceId);
  }
  /**
   * @summary: Close a specific dropdown instance based on the instance ID.
   * @param instanceId: Instance id of the dropdown that must be closed.
   */
  closeDropdown(instanceId) {
    this.closeDropdownInstance.emit(instanceId);
  }
};
SelectDropDownService.ɵfac = function SelectDropDownService_Factory(t) {
  return new (t || SelectDropDownService)();
};
SelectDropDownService.ɵprov = ɵɵdefineInjectable({
  token: SelectDropDownService,
  factory: SelectDropDownService.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SelectDropDownService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [];
  }, null);
})();
var FilterByPipe = class {
  transform(array, searchText, keyName) {
    if (!array || !searchText || !Array.isArray(array)) {
      return array;
    }
    if (typeof array[0] === "string") {
      return array.filter((item) => item.toLowerCase().indexOf(searchText.trim().toLowerCase()) > -1);
    }
    if (!keyName) {
      return array.filter((item) => {
        for (const key in item) {
          if (typeof item[key] !== "object" && item[key].toString().toLowerCase().indexOf(searchText.trim().toLowerCase()) > -1) {
            return true;
          }
        }
        return false;
      });
    } else {
      return array.filter((item) => {
        if (typeof item[keyName] !== "object" && item[keyName].toString().toLowerCase().indexOf(searchText.trim().toLowerCase()) > -1) {
          return true;
        }
        return false;
      });
    }
  }
};
FilterByPipe.ɵfac = function FilterByPipe_Factory(t) {
  return new (t || FilterByPipe)();
};
FilterByPipe.ɵpipe = ɵɵdefinePipe({
  name: "filterBy",
  type: FilterByPipe,
  pure: true
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FilterByPipe, [{
    type: Pipe,
    args: [{
      name: "filterBy"
    }]
  }], null, null);
})();
var LimitToPipe = class {
  transform(array, itemsCount, startIndex = 0) {
    if (!Array.isArray(array) || itemsCount === 0) {
      return array;
    }
    return array.slice(startIndex, startIndex + itemsCount);
  }
};
LimitToPipe.ɵfac = function LimitToPipe_Factory(t) {
  return new (t || LimitToPipe)();
};
LimitToPipe.ɵpipe = ɵɵdefinePipe({
  name: "limitTo",
  type: LimitToPipe,
  pure: true
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LimitToPipe, [{
    type: Pipe,
    args: [{
      name: "limitTo"
    }]
  }], null, null);
})();
var config = {
  displayKey: "description",
  height: "auto",
  search: false,
  placeholder: "Select",
  searchPlaceholder: "Search...",
  limitTo: 0,
  customComparator: void 0,
  noResultsFound: "No results found!",
  moreText: "more",
  searchOnKey: null,
  clearOnSelection: false,
  inputDirection: "ltr",
  selectAllLabel: "Select all",
  enableSelectAll: false
};
var NgxSelectDropdownComponent = class {
  constructor(cdref, _elementRef, dropdownService) {
    this.cdref = cdref;
    this._elementRef = _elementRef;
    this.dropdownService = dropdownService;
    this.options = [];
    this.config = config;
    this.multiple = false;
    this.change = new EventEmitter();
    this.searchChange = new EventEmitter();
    this.open = new EventEmitter();
    this.close = new EventEmitter();
    this.toggleDropdown = false;
    this.availableItems = [];
    this.selectedItems = [];
    this.selectedDisplayText = "Select";
    this.clickedInside = false;
    this.insideKeyPress = false;
    this.focusedItemIndex = null;
    this.showNotFound = false;
    this.onChange = () => {
    };
    this.onTouched = () => {
    };
    this.tabindex = 0;
    this.multiple = false;
    this.selectAll = false;
  }
  get value() {
    return this._value;
  }
  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }
  /**
   * click listener for host inside this component i.e
   * if many instances are there, this detects if clicked inside
   * this instance
   */
  clickInsideComponent() {
    this.clickedInside = true;
  }
  /**
   * View reference for the dorpdown list
   */
  set dropDownElement(ref) {
    if (ref) {
      this.dropdownList = ref;
    }
  }
  /**
   * Event listener for the blur event to hide the dropdown
   */
  blur($event) {
    if (!this.insideKeyPress && !this.optionMouseDown && $event instanceof KeyboardEvent) {
      this.toggleDropdown = false;
      this.openStateChange();
    }
  }
  /**
   * Event listener for the focus event to show the dropdown when using tab key
   */
  focus() {
    if (!this.disabled) {
      this.toggleDropdown = true;
      this.openStateChange();
    }
  }
  /**
   * click handler on documnent to hide the open dropdown if clicked outside
   */
  clickOutsideComponent() {
    if (!this.clickedInside) {
      this.toggleDropdown = false;
      this.openStateChange();
      this.resetArrowKeyActiveElement();
      this.searchText = null;
      this.close.emit();
    }
    this.clickedInside = false;
  }
  /**
   * click handler on documnent to hide the open dropdown if clicked outside
   */
  KeyPressOutsideComponent() {
    if (!this.insideKeyPress) {
      this.toggleDropdown = false;
      this.openStateChange();
      this.resetArrowKeyActiveElement();
    }
    this.insideKeyPress = false;
  }
  /**
   * Event handler for key up and down event and enter press for selecting element
   */
  handleKeyboardEvent($event) {
    this.insideKeyPress = true;
    if ($event.keyCode === 27 || this.disabled) {
      this.toggleDropdown = false;
      this.openStateChange();
      this.insideKeyPress = false;
      return;
    }
    const avaOpts = this.availableOptions.toArray();
    if ($event.keyCode !== 9 && avaOpts.length === 0 && !this.toggleDropdown) {
      this.toggleDropdown = true;
      this.openStateChange();
    }
    if ($event.keyCode === 40 && avaOpts.length > 0) {
      this.onArrowKeyDown();
      if (this.focusedItemIndex >= avaOpts.length) {
        this.focusedItemIndex = 0;
      }
      avaOpts[this.focusedItemIndex].nativeElement.focus();
      $event.preventDefault();
    }
    if ($event.keyCode === 38 && avaOpts.length) {
      this.onArrowKeyUp();
      if (this.focusedItemIndex >= avaOpts.length) {
        this.focusedItemIndex = avaOpts.length - 1;
      }
      avaOpts[this.focusedItemIndex].nativeElement.focus();
      $event.preventDefault();
    }
    if ($event.keyCode === 13 && this.focusedItemIndex !== null) {
      const filteredItems = new FilterByPipe().transform(this.availableItems, this.searchText, this.config.searchOnKey);
      this.selectItem(filteredItems[this.focusedItemIndex], this.availableItems.indexOf(filteredItems[this.focusedItemIndex]));
      return false;
    }
  }
  /**
   * Component onInit
   */
  ngOnInit() {
    if (typeof this.options !== "undefined" && typeof this.config !== "undefined" && Array.isArray(this.options)) {
      this.availableItems = [...this.options.sort(this.config.customComparator)];
      this.initDropdownValuesAndOptions();
    }
    this.serviceSubscriptions();
  }
  isVisible() {
    if (!this.dropdownList) {
      return {
        visible: false,
        element: null
      };
    }
    const el = this.dropdownList.nativeElement;
    if (!el) {
      return {
        visible: false,
        element: el
      };
    }
    const rect = el.getBoundingClientRect();
    const topShown = rect.top >= 0;
    const bottomShown = rect.bottom <= window.innerHeight;
    return {
      visible: topShown && bottomShown,
      element: el
    };
  }
  serviceSubscriptions() {
    this.dropdownService.openDropdownInstance.subscribe((instanceId) => {
      if (this.instanceId === instanceId) {
        this.toggleDropdown = true;
        this.openStateChange();
        this.resetArrowKeyActiveElement();
      }
    });
    this.dropdownService.closeDropdownInstance.subscribe((instanceId) => {
      if (this.instanceId === instanceId) {
        this.toggleDropdown = false;
        this.openStateChange();
        this.resetArrowKeyActiveElement();
      }
    });
  }
  /**
   * after view init to subscribe to available option changes
   */
  ngAfterViewInit() {
    this.availableOptions.changes.subscribe(this.setNotFoundState.bind(this));
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
  }
  writeValue(value, internal) {
    if (value) {
      if (Array.isArray(value)) {
        if (this.multiple) {
          this.value = value;
        } else if (value.length > 0) {
          this.value = value[0];
        }
      } else {
        this.value = value;
      }
      if (this.selectedItems.length === 0) {
        if (Array.isArray(value)) {
          this.selectedItems = value;
        } else {
          this.selectedItems.push(value);
        }
        this.initDropdownValuesAndOptions();
      }
    } else {
      this.value = [];
      if (!internal) {
        this.reset();
      }
    }
    if (!internal) {
      this.reset();
    }
  }
  reset() {
    if (!this.config) {
      return;
    }
    this.selectedItems = [];
    this.availableItems = [...this.options.sort(this.config.customComparator)];
    this.initDropdownValuesAndOptions();
  }
  /**
   * function sets whether to show items not found text or not
   */
  setNotFoundState() {
    if (this.availableOptions.length === 0 && this.selectedItems.length !== this.options.length) {
      this.showNotFound = true;
    } else {
      this.showNotFound = false;
    }
    this.cdref.detectChanges();
  }
  /**
   * Component onchage i.e when any of the input properties change
   */
  ngOnChanges(changes) {
    if (!this.config) {
      return;
    }
    this.selectedItems = [];
    this.options = this.options || [];
    if (changes.options) {
      this.availableItems = [...this.options.sort(this.config.customComparator)];
    }
    if (changes.value) {
      if (JSON.stringify(changes.value.currentValue) === JSON.stringify([]) || changes.value.currentValue === "" || changes.value.currentValue === null) {
        this.availableItems = [...this.options.sort(this.config.customComparator)];
      }
    }
    this.initDropdownValuesAndOptions();
  }
  /**
   * Deselct a selected items
   * @param item:  item to be deselected
   * @param index:  index of the item
   */
  deselectItem(item, index) {
    this.selectedItems.forEach((element, i) => {
      if (item === element) {
        this.selectedItems.splice(i, 1);
      }
    });
    let sortedItems = [...this.availableItems];
    if (!this.availableItems.includes(item)) {
      this.availableItems.push(item);
      sortedItems = this.availableItems.sort(this.config.customComparator);
    }
    this.selectedItems = [...this.selectedItems];
    this.availableItems = [...sortedItems];
    if (!Array.isArray(this.value)) {
      this.value = [];
    }
    if (!this.areAllSelected()) {
      this.selectAll = false;
    }
    this.valueChanged();
    this.resetArrowKeyActiveElement();
  }
  /**
   * Select an item
   * @param item:  item to be selected
   * @param index:  index of the item
   */
  selectItem(item, index) {
    if (!this.multiple) {
      if (this.selectedItems.length > 0) {
        this.availableItems.push(this.selectedItems[0]);
      }
      this.selectedItems = [];
      this.toggleDropdown = false;
    }
    this.availableItems.forEach((element, i) => {
      if (item === element) {
        this.selectedItems.push(item);
        this.availableItems.splice(i, 1);
      }
    });
    if (this.config.clearOnSelection) {
      this.searchText = null;
    }
    this.selectedItems = [...this.selectedItems];
    this.availableItems = [...this.availableItems];
    this.selectedItems.sort(this.config.customComparator);
    this.availableItems.sort(this.config.customComparator);
    if (this.areAllSelected()) {
      this.selectAll = true;
    }
    this.valueChanged();
    this.resetArrowKeyActiveElement();
  }
  /**
   * When selected items changes trigger the chaange back to parent
   */
  valueChanged() {
    this.writeValue(this.selectedItems, true);
    this.change.emit({
      value: this.value
    });
    this.setSelectedDisplayText();
  }
  /**
   * Toggle the dropdownlist on/off
   */
  openSelectDropdown() {
    this.toggleDropdown = true;
    this.top = "30px";
    this.openStateChange();
    this.resetArrowKeyActiveElement();
    setTimeout(() => {
      const {
        visible,
        element
      } = this.isVisible();
      if (element) {
        this.top = visible ? "30px" : `-${element.getBoundingClientRect().height}px`;
      }
    }, 3);
  }
  closeSelectDropdown() {
    this.toggleDropdown = false;
    this.openStateChange();
    this.resetArrowKeyActiveElement();
  }
  openStateChange() {
    if (this.toggleDropdown) {
      this.dropdownService.openInstances.push(this.instanceId);
      this.open.emit();
    } else {
      this.searchText = null;
      this.optionMouseDown = false;
      this.close.emit();
      this.dropdownService.openInstances.splice(this.dropdownService.openInstances.indexOf(this.instanceId), 1);
    }
  }
  /**
   * The change handler for search text
   */
  searchTextChanged() {
    this.searchChange.emit(this.searchText);
  }
  changeSearchText($event) {
    $event.stopPropagation();
  }
  /**
   * initialize the config and other properties
   */
  initDropdownValuesAndOptions() {
    if (typeof this.config === "undefined" || Object.keys(this.config).length === 0) {
      this.config = __spreadValues({}, config);
    }
    for (const key of Object.keys(config)) {
      this.config[key] = this.config[key] ? this.config[key] : config[key];
    }
    this.config = __spreadValues({}, this.config);
    this.selectedDisplayText = this.config["placeholder"];
    if (this.value !== "" && typeof this.value !== "undefined") {
      if (Array.isArray(this.value)) {
        this.selectedItems = this.value;
      } else if (this.value !== "" && this.value !== null) {
        this.selectedItems[0] = this.value;
      } else {
        this.selectedItems = [];
        this.value = [];
      }
      this.selectedItems.forEach((item) => {
        const ind = this.availableItems.findIndex((aItem) => JSON.stringify(item) === JSON.stringify(aItem));
        if (ind !== -1) {
          this.availableItems.splice(ind, 1);
        }
      });
    }
    this.setSelectedDisplayText();
  }
  /**
   * set the text to be displayed
   */
  setSelectedDisplayText() {
    let text = this.selectedItems[0];
    if (typeof this.selectedItems[0] === "object") {
      text = this.config.displayFn ? this.config.displayFn(this.selectedItems[0]) : this.selectedItems[0][this.config.displayKey];
    }
    if (this.multiple && this.selectedItems.length > 0) {
      this.selectedDisplayText = this.selectedItems.length === 1 ? text : text + ` + ${this.selectedItems.length - 1} ${this.config.moreText}`;
    } else {
      this.selectedDisplayText = this.selectedItems.length === 0 ? this.config.placeholder : text;
    }
  }
  /**
   * Event handler for arrow key up event thats focuses on a item
   */
  onArrowKeyUp() {
    if (this.focusedItemIndex === 0) {
      this.focusedItemIndex = this.availableItems.length - 1;
      return;
    }
    if (this.onArrowKey()) {
      this.focusedItemIndex--;
    }
  }
  /**
   * Event handler for arrow key down event thats focuses on a item
   */
  onArrowKeyDown() {
    if (this.focusedItemIndex === this.availableItems.length - 1) {
      this.focusedItemIndex = 0;
      return;
    }
    if (this.onArrowKey()) {
      this.focusedItemIndex++;
    }
  }
  onArrowKey() {
    if (this.focusedItemIndex === null) {
      this.focusedItemIndex = 0;
      return false;
    }
    return true;
  }
  /**
   * will reset the element that is marked active using arrow keys
   */
  resetArrowKeyActiveElement() {
    this.focusedItemIndex = null;
  }
  /**
   * Toggle the select all option
   */
  toggleSelectAll(close, emitChange) {
    this.selectAll = !this.selectAll;
    if (this.selectAll) {
      this.selectedItems = [...this.selectedItems, ...this.availableItems];
      this.availableItems = [];
    } else {
      this.availableItems = [...this.selectedItems, ...this.availableItems];
      this.selectedItems = [];
    }
    this.selectedItems.sort(this.config.customComparator);
    this.availableItems.sort(this.config.customComparator);
    this.valueChanged();
    this.closeSelectDropdown();
    this.openStateChange();
    this.resetArrowKeyActiveElement();
  }
  /**
   * Check if all options selected
   */
  areAllSelected() {
    return this.selectedItems.length === this.options.length;
  }
};
NgxSelectDropdownComponent.ɵfac = function NgxSelectDropdownComponent_Factory(t) {
  return new (t || NgxSelectDropdownComponent)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(SelectDropDownService));
};
NgxSelectDropdownComponent.ɵcmp = ɵɵdefineComponent({
  type: NgxSelectDropdownComponent,
  selectors: [["ngx-select-dropdown"]],
  viewQuery: function NgxSelectDropdownComponent_Query(rf, ctx) {
    if (rf & 1) {
      ɵɵviewQuery(_c0, 5);
      ɵɵviewQuery(_c1, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.dropDownElement = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.availableOptions = _t);
    }
  },
  hostVars: 1,
  hostBindings: function NgxSelectDropdownComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("click", function NgxSelectDropdownComponent_click_HostBindingHandler() {
        return ctx.clickInsideComponent();
      })("blur", function NgxSelectDropdownComponent_blur_HostBindingHandler() {
        return ctx.blur();
      })("focus", function NgxSelectDropdownComponent_focus_HostBindingHandler() {
        return ctx.focus();
      })("click", function NgxSelectDropdownComponent_click_HostBindingHandler() {
        return ctx.clickOutsideComponent();
      }, false, ɵɵresolveDocument)("keydown", function NgxSelectDropdownComponent_keydown_HostBindingHandler() {
        return ctx.KeyPressOutsideComponent();
      }, false, ɵɵresolveDocument)("keydown", function NgxSelectDropdownComponent_keydown_HostBindingHandler($event) {
        return ctx.handleKeyboardEvent($event);
      });
    }
    if (rf & 2) {
      ɵɵattribute("tabindex", ctx.tabindex);
    }
  },
  inputs: {
    _value: "_value",
    options: "options",
    config: "config",
    multiple: "multiple",
    disabled: "disabled",
    instanceId: "instanceId",
    selectedItemTemplate: "selectedItemTemplate",
    optionItemTemplate: "optionItemTemplate",
    notFoundTemplate: "notFoundTemplate",
    dropdownButtonTemplate: "dropdownButtonTemplate"
  },
  outputs: {
    change: "change",
    searchChange: "searchChange",
    open: "open",
    close: "close"
  },
  features: [ɵɵProvidersFeature([{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgxSelectDropdownComponent),
    multi: true
  }]), ɵɵNgOnChangesFeature],
  decls: 12,
  vars: 3,
  consts: [[1, "ngx-dropdown-container"], [3, "ngClass", "click", 4, "ngIf"], ["class", "ngx-dropdown-list-container", 3, "maxHeight", "top", 4, "ngIf"], ["notFound", ""], ["availableItemTemplate", ""], ["selectedTemplate", ""], ["dropdownButton", ""], [3, "ngClass", "click"], [3, "ngTemplateOutlet"], [1, "ngx-dropdown-list-container"], ["dropdownList", ""], ["class", "search-container", 4, "ngIf"], [4, "ngIf"], [1, "selected-items"], ["class", "selected-item", "tabindex", "-1", 3, "click", "mousedown", 4, "ngFor", "ngForOf"], [1, "available-items"], ["class", "available-item", "tabindex", "-1", 3, "ngClass", "click", "mousedown", 4, "ngFor", "ngForOf"], [1, "search-container"], ["name", "search-text", "tabindex", "-1", "autocomplete", "off", 3, "ngModel", "change", "input", "ngModelChange"], [3, "ngClass"], [1, "nsdicon-search"], [1, "select-options"], [3, "click"], ["type", "checkbox", 1, "filled-in", 3, "ngModel", "ngModelChange"], ["tabindex", "-1", 1, "selected-item", 3, "click", "mousedown"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], ["tabindex", "-1", 1, "available-item", 3, "ngClass", "click", "mousedown"], ["availableOption", ""], [1, "nsdicon-close"], ["type", "button", "tabindex", "-1", 1, "ngx-dropdown-button", 3, "ngClass", "disabled"], [1, "display-text"], [1, "nsdicon-angle-down", 3, "ngClass"]],
  template: function NgxSelectDropdownComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "div", 0);
      ɵɵtemplate(1, NgxSelectDropdownComponent_div_1_Template, 2, 4, "div", 1)(2, NgxSelectDropdownComponent_div_2_Template, 2, 4, "div", 1)(3, NgxSelectDropdownComponent_div_3_Template, 12, 17, "div", 2);
      ɵɵelementEnd();
      ɵɵtemplate(4, NgxSelectDropdownComponent_ng_template_4_Template, 1, 1, "ng-template", null, 3, ɵɵtemplateRefExtractor)(6, NgxSelectDropdownComponent_ng_template_6_Template, 2, 1, "ng-template", null, 4, ɵɵtemplateRefExtractor)(8, NgxSelectDropdownComponent_ng_template_8_Template, 4, 1, "ng-template", null, 5, ɵɵtemplateRefExtractor)(10, NgxSelectDropdownComponent_ng_template_10_Template, 4, 8, "ng-template", null, 6, ɵɵtemplateRefExtractor);
    }
    if (rf & 2) {
      ɵɵadvance();
      ɵɵproperty("ngIf", !ctx.toggleDropdown);
      ɵɵadvance();
      ɵɵproperty("ngIf", ctx.toggleDropdown);
      ɵɵadvance();
      ɵɵproperty("ngIf", ctx.toggleDropdown);
    }
  },
  dependencies: [NgClass, NgForOf, NgIf, NgTemplateOutlet, DefaultValueAccessor, CheckboxControlValueAccessor, NgControlStatus, NgModel, FilterByPipe, LimitToPipe],
  styles: ['.ngx-dropdown-container[_ngcontent-%COMP%]{width:100%;position:relative}.ngx-dropdown-container[_ngcontent-%COMP%]   .ngx-dropdown-button[_ngcontent-%COMP%]{display:inline-block;margin-bottom:0;font-weight:400;line-height:1.42857143;vertical-align:middle;touch-action:manipulation;cursor:pointer;-webkit-user-select:none;user-select:none;border:1px solid #ccc;border-radius:4px;color:#333;background-color:#fff;white-space:nowrap;overflow-x:hidden;text-overflow:ellipsis;text-align:left}.ngx-dropdown-container[_ngcontent-%COMP%]   .ngx-dropdown-button[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{display:inline;vertical-align:middle}.ngx-dropdown-container[_ngcontent-%COMP%]   .ngx-dropdown-button[_ngcontent-%COMP%]   .nsdicon-angle-down[_ngcontent-%COMP%]{right:5px;position:relative;float:right;transition:transform .2s ease}.ngx-dropdown-container[_ngcontent-%COMP%]   .ngx-dropdown-button[_ngcontent-%COMP%]   .nsdicon-angle-down[_ngcontent-%COMP%]:before{border-style:solid;border-width:.1em .1em 0 0;content:"";display:inline-block;height:10px;position:relative;vertical-align:text-top;width:10px;top:0;transform:rotate(135deg)}.ngx-dropdown-container[_ngcontent-%COMP%]   .ngx-dropdown-button[_ngcontent-%COMP%]   .nsdicon-angle-down.up[_ngcontent-%COMP%]{transform:rotate(180deg);transition:transform .2s ease}.ngx-dropdown-container[_ngcontent-%COMP%]   .ngx-dropdown-button[_ngcontent-%COMP%]{width:100%;min-height:30px;padding:5px 10px;background-color:#fff}.ngx-dropdown-container[_ngcontent-%COMP%]   .ngx-dropdown-button[_ngcontent-%COMP%]   .display-text[_ngcontent-%COMP%]{display:inline-block;width:calc(100% - 20px)}.ngx-dropdown-container[_ngcontent-%COMP%]   .ngx-dropdown-list-container[_ngcontent-%COMP%]{box-sizing:border-box;border:1px solid rgba(0,0,0,.15);border-radius:4px;padding-left:10px;padding-right:10px;z-index:999999999;width:100%;background-clip:padding-box;background:white;position:absolute;box-shadow:5px 5px 5px #00000036;overflow-y:auto}.ngx-dropdown-container[_ngcontent-%COMP%]   .ngx-dropdown-list-container[_ngcontent-%COMP%]   .select-options[_ngcontent-%COMP%]{padding-top:10px}.ngx-dropdown-container[_ngcontent-%COMP%]   .ngx-dropdown-list-container[_ngcontent-%COMP%]   .select-options[_ngcontent-%COMP%]   .filled-in[_ngcontent-%COMP%]:checked + span[_ngcontent-%COMP%]:not(.lever):after, .ngx-dropdown-container[_ngcontent-%COMP%]   .ngx-dropdown-list-container[_ngcontent-%COMP%]   .select-options[_ngcontent-%COMP%]   .filled-in[_ngcontent-%COMP%]:not(:checked) + span[_ngcontent-%COMP%]:not(.lever):after{height:15px;width:15px}.ngx-dropdown-container[_ngcontent-%COMP%]   .ngx-dropdown-list-container[_ngcontent-%COMP%]   .select-options[_ngcontent-%COMP%]   .filled-in[_ngcontent-%COMP%]:checked + span[_ngcontent-%COMP%]:not(.lever):after{border-color:#337ab7;background-color:#337ab7}.ngx-dropdown-container[_ngcontent-%COMP%]   .ngx-dropdown-list-container[_ngcontent-%COMP%]   .select-options[_ngcontent-%COMP%]   .filled-in[_ngcontent-%COMP%]:checked + span[_ngcontent-%COMP%]:not(.lever):before{top:-2px;left:1px;width:5px;height:11px}.ngx-dropdown-container[_ngcontent-%COMP%]   .ngx-dropdown-list-container[_ngcontent-%COMP%]   .select-options[_ngcontent-%COMP%]   [type=checkbox][_ngcontent-%COMP%] + span[_ngcontent-%COMP%]:not(.lever){line-height:15px;height:15px;padding-left:25px}.ngx-dropdown-container[_ngcontent-%COMP%]   .ngx-dropdown-list-container[_ngcontent-%COMP%]   .search-container[_ngcontent-%COMP%]{position:relative;padding-top:10px;margin-top:5px}.ngx-dropdown-container[_ngcontent-%COMP%]   .ngx-dropdown-list-container[_ngcontent-%COMP%]   .search-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{background-color:transparent;border:none;border-bottom:1px solid #9e9e9e;border-radius:0;outline:none;height:2rem;width:100%;font-size:13px;margin:0;padding:0;box-shadow:none;box-sizing:content-box;transition:all .3s}.ngx-dropdown-container[_ngcontent-%COMP%]   .ngx-dropdown-list-container[_ngcontent-%COMP%]   .search-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus{border-bottom:1px solid #26a69a}.ngx-dropdown-container[_ngcontent-%COMP%]   .ngx-dropdown-list-container[_ngcontent-%COMP%]   .search-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus + label[_ngcontent-%COMP%]{transform:translateY(-2px) scale(.8);transform-origin:0 0}.ngx-dropdown-container[_ngcontent-%COMP%]   .ngx-dropdown-list-container[_ngcontent-%COMP%]   .search-container[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{color:#9e9e9e;position:absolute;top:0;left:0;height:100%;font-size:1rem;cursor:text;transition:transform .2s ease-out;transform-origin:0% 100%;text-align:initial;transform:translateY(12px);pointer-events:none}.ngx-dropdown-container[_ngcontent-%COMP%]   .ngx-dropdown-list-container[_ngcontent-%COMP%]   .search-container[_ngcontent-%COMP%]   label.active[_ngcontent-%COMP%]{transform:translateY(-2px) scale(.8);transform-origin:0 0}.ngx-dropdown-container[_ngcontent-%COMP%]   .ngx-dropdown-list-container[_ngcontent-%COMP%]   .available-items[_ngcontent-%COMP%], .ngx-dropdown-container[_ngcontent-%COMP%]   .ngx-dropdown-list-container[_ngcontent-%COMP%]   .selected-items[_ngcontent-%COMP%]{margin-top:1rem;margin-bottom:1rem;list-style-type:none;padding-left:0}.ngx-dropdown-container[_ngcontent-%COMP%]   .ngx-dropdown-list-container[_ngcontent-%COMP%]   .available-items.selected-items[_ngcontent-%COMP%]   .selected-item[_ngcontent-%COMP%], .ngx-dropdown-container[_ngcontent-%COMP%]   .ngx-dropdown-list-container[_ngcontent-%COMP%]   .selected-items.selected-items[_ngcontent-%COMP%]   .selected-item[_ngcontent-%COMP%]{background-color:#337ab7;color:#fff;margin-bottom:2px}.ngx-dropdown-container[_ngcontent-%COMP%]   .ngx-dropdown-list-container[_ngcontent-%COMP%]   .available-items.selected-items[_ngcontent-%COMP%]   .selected-item[_ngcontent-%COMP%]   .nsdicon-close[_ngcontent-%COMP%], .ngx-dropdown-container[_ngcontent-%COMP%]   .ngx-dropdown-list-container[_ngcontent-%COMP%]   .selected-items.selected-items[_ngcontent-%COMP%]   .selected-item[_ngcontent-%COMP%]   .nsdicon-close[_ngcontent-%COMP%]{font-weight:700;font-size:large}.ngx-dropdown-container[_ngcontent-%COMP%]   .ngx-dropdown-list-container[_ngcontent-%COMP%]   .available-items.available-items[_ngcontent-%COMP%]   .available-item.active[_ngcontent-%COMP%], .ngx-dropdown-container[_ngcontent-%COMP%]   .ngx-dropdown-list-container[_ngcontent-%COMP%]   .selected-items.available-items[_ngcontent-%COMP%]   .available-item.active[_ngcontent-%COMP%]{background-color:#337ab7;color:#fff}.ngx-dropdown-container[_ngcontent-%COMP%]   .ngx-dropdown-list-container[_ngcontent-%COMP%]   .available-items[_ngcontent-%COMP%]   .available-item[_ngcontent-%COMP%], .ngx-dropdown-container[_ngcontent-%COMP%]   .ngx-dropdown-list-container[_ngcontent-%COMP%]   .available-items[_ngcontent-%COMP%]   .selected-item[_ngcontent-%COMP%], .ngx-dropdown-container[_ngcontent-%COMP%]   .ngx-dropdown-list-container[_ngcontent-%COMP%]   .selected-items[_ngcontent-%COMP%]   .available-item[_ngcontent-%COMP%], .ngx-dropdown-container[_ngcontent-%COMP%]   .ngx-dropdown-list-container[_ngcontent-%COMP%]   .selected-items[_ngcontent-%COMP%]   .selected-item[_ngcontent-%COMP%]{font-size:inherit;cursor:pointer;display:block;padding:3px 20px;clear:both;font-weight:400;line-height:1.42857143;color:#333;white-space:normal}.ngx-dropdown-container[_ngcontent-%COMP%]   .ngx-disabled[_ngcontent-%COMP%]{pointer-events:none;background-color:#e9ecef;opacity:1;cursor:no-drop}']
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxSelectDropdownComponent, [{
    type: Component,
    args: [{
      selector: "ngx-select-dropdown",
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => NgxSelectDropdownComponent),
        multi: true
      }],
      template: `<div class="ngx-dropdown-container">
    <div [ngClass]="{ 'ngx-disabled': disabled }" *ngIf="!toggleDropdown" (click)="openSelectDropdown()">
        <ng-container [ngTemplateOutlet]="dropdownButtonTemplate || dropdownButton"></ng-container>
    </div>
    <div [ngClass]="{ 'ngx-disabled': disabled }" *ngIf="toggleDropdown" (click)="closeSelectDropdown()">
        <ng-container [ngTemplateOutlet]="dropdownButtonTemplate || dropdownButton"></ng-container>
    </div>
    <div #dropdownList class="ngx-dropdown-list-container" *ngIf="toggleDropdown" [style.maxHeight]="config.height"
        [style.top]="top">
        <div class="search-container" *ngIf="config.search">
            <input (change)="changeSearchText($event)" [style.direction]="config.inputDirection" name="search-text"
                (input)="searchTextChanged()" [(ngModel)]="searchText" tabindex="-1" autocomplete="off" />
            <label [ngClass]="{ active: searchText }">
                <span class="nsdicon-search"></span>
                {{ config.searchPlaceholder }}</label>
        </div>
        <div *ngIf="config.enableSelectAll &&  multiple">
            <div class="select-options">
                <label (click)="toggleSelectAll(true, true)">
                    <input type="checkbox" class="filled-in" [(ngModel)]="selectAll" />
                    <span>{{ config.selectAllLabel }}</span>
                </label>
            </div>
        </div>
        <div class="selected-items">
            <div class="selected-item" tabindex="-1" *ngFor="let selected of selectedItems; let i = index"
                (click)="deselectItem(selected, i)" (mousedown)="optionMouseDown = true">
                <ng-container [ngTemplateOutlet]="selectedItemTemplate || selectedTemplate"
                    [ngTemplateOutletContext]="{item: selected, config: config}"></ng-container>

            </div>
        </div>
        <hr *ngIf="selectedItems.length > 0 && availableItems.length > 0" />
        <div class="available-items">
            <div class="available-item" #availableOption *ngFor="
            let item of availableItems
              | filterBy: searchText:config.searchOnKey
              | limitTo: config.limitTo;
            let i = index
          " tabindex="-1" [ngClass]="{
            active: focusedItemIndex == i && !item.disabled,
            disabled: item.disabled
          }" (click)="selectItem(item, i)" (mousedown)="optionMouseDown = true">
                <ng-container [ngTemplateOutlet]="optionItemTemplate || availableItemTemplate"
                    [ngTemplateOutletContext]="{item: item, config: config}"></ng-container>
            </div>
            <ng-container [ngTemplateOutlet]="notFoundTemplate || notFound"></ng-container>
        </div>
    </div>
</div>

<ng-template #notFound>
    <div *ngIf="showNotFound">{{ config.noResultsFound }}</div>
</ng-template>

<ng-template #availableItemTemplate let-item="item" let-config="config">
    <span>
        {{
        config.displayFn
        ? config.displayFn(item)
        : item[config.displayKey] || item
        }}
    </span>
</ng-template>
<ng-template #selectedTemplate let-item="item" let-config="config">
    <span class="nsdicon-close">x</span>
    <span>
        {{
        config.displayFn
        ? config.displayFn(item)
        : item[config.displayKey] || item
        }}
    </span>
</ng-template>

<ng-template #dropdownButton>
    <button type="button" tabindex="-1" class="ngx-dropdown-button" [ngClass]="{ 'ngx-disabled': disabled }"
        [disabled]="disabled">
        <span class="display-text">{{ selectedDisplayText }} </span>
        <span class="nsdicon-angle-down" [ngClass]="{'up': toggleDropdown }"></span>
    </button>
</ng-template>`,
      styles: ['.ngx-dropdown-container{width:100%;position:relative}.ngx-dropdown-container .ngx-dropdown-button{display:inline-block;margin-bottom:0;font-weight:400;line-height:1.42857143;vertical-align:middle;touch-action:manipulation;cursor:pointer;-webkit-user-select:none;user-select:none;border:1px solid #ccc;border-radius:4px;color:#333;background-color:#fff;white-space:nowrap;overflow-x:hidden;text-overflow:ellipsis;text-align:left}.ngx-dropdown-container .ngx-dropdown-button span{display:inline;vertical-align:middle}.ngx-dropdown-container .ngx-dropdown-button .nsdicon-angle-down{right:5px;position:relative;float:right;transition:transform .2s ease}.ngx-dropdown-container .ngx-dropdown-button .nsdicon-angle-down:before{border-style:solid;border-width:.1em .1em 0 0;content:"";display:inline-block;height:10px;position:relative;vertical-align:text-top;width:10px;top:0;transform:rotate(135deg)}.ngx-dropdown-container .ngx-dropdown-button .nsdicon-angle-down.up{transform:rotate(180deg);transition:transform .2s ease}.ngx-dropdown-container .ngx-dropdown-button{width:100%;min-height:30px;padding:5px 10px;background-color:#fff}.ngx-dropdown-container .ngx-dropdown-button .display-text{display:inline-block;width:calc(100% - 20px)}.ngx-dropdown-container .ngx-dropdown-list-container{box-sizing:border-box;border:1px solid rgba(0,0,0,.15);border-radius:4px;padding-left:10px;padding-right:10px;z-index:999999999;width:100%;background-clip:padding-box;background:white;position:absolute;box-shadow:5px 5px 5px #00000036;overflow-y:auto}.ngx-dropdown-container .ngx-dropdown-list-container .select-options{padding-top:10px}.ngx-dropdown-container .ngx-dropdown-list-container .select-options .filled-in:checked+span:not(.lever):after,.ngx-dropdown-container .ngx-dropdown-list-container .select-options .filled-in:not(:checked)+span:not(.lever):after{height:15px;width:15px}.ngx-dropdown-container .ngx-dropdown-list-container .select-options .filled-in:checked+span:not(.lever):after{border-color:#337ab7;background-color:#337ab7}.ngx-dropdown-container .ngx-dropdown-list-container .select-options .filled-in:checked+span:not(.lever):before{top:-2px;left:1px;width:5px;height:11px}.ngx-dropdown-container .ngx-dropdown-list-container .select-options [type=checkbox]+span:not(.lever){line-height:15px;height:15px;padding-left:25px}.ngx-dropdown-container .ngx-dropdown-list-container .search-container{position:relative;padding-top:10px;margin-top:5px}.ngx-dropdown-container .ngx-dropdown-list-container .search-container input{background-color:transparent;border:none;border-bottom:1px solid #9e9e9e;border-radius:0;outline:none;height:2rem;width:100%;font-size:13px;margin:0;padding:0;box-shadow:none;box-sizing:content-box;transition:all .3s}.ngx-dropdown-container .ngx-dropdown-list-container .search-container input:focus{border-bottom:1px solid #26a69a}.ngx-dropdown-container .ngx-dropdown-list-container .search-container input:focus+label{transform:translateY(-2px) scale(.8);transform-origin:0 0}.ngx-dropdown-container .ngx-dropdown-list-container .search-container label{color:#9e9e9e;position:absolute;top:0;left:0;height:100%;font-size:1rem;cursor:text;transition:transform .2s ease-out;transform-origin:0% 100%;text-align:initial;transform:translateY(12px);pointer-events:none}.ngx-dropdown-container .ngx-dropdown-list-container .search-container label.active{transform:translateY(-2px) scale(.8);transform-origin:0 0}.ngx-dropdown-container .ngx-dropdown-list-container .available-items,.ngx-dropdown-container .ngx-dropdown-list-container .selected-items{margin-top:1rem;margin-bottom:1rem;list-style-type:none;padding-left:0}.ngx-dropdown-container .ngx-dropdown-list-container .available-items.selected-items .selected-item,.ngx-dropdown-container .ngx-dropdown-list-container .selected-items.selected-items .selected-item{background-color:#337ab7;color:#fff;margin-bottom:2px}.ngx-dropdown-container .ngx-dropdown-list-container .available-items.selected-items .selected-item .nsdicon-close,.ngx-dropdown-container .ngx-dropdown-list-container .selected-items.selected-items .selected-item .nsdicon-close{font-weight:700;font-size:large}.ngx-dropdown-container .ngx-dropdown-list-container .available-items.available-items .available-item.active,.ngx-dropdown-container .ngx-dropdown-list-container .selected-items.available-items .available-item.active{background-color:#337ab7;color:#fff}.ngx-dropdown-container .ngx-dropdown-list-container .available-items .available-item,.ngx-dropdown-container .ngx-dropdown-list-container .available-items .selected-item,.ngx-dropdown-container .ngx-dropdown-list-container .selected-items .available-item,.ngx-dropdown-container .ngx-dropdown-list-container .selected-items .selected-item{font-size:inherit;cursor:pointer;display:block;padding:3px 20px;clear:both;font-weight:400;line-height:1.42857143;color:#333;white-space:normal}.ngx-dropdown-container .ngx-disabled{pointer-events:none;background-color:#e9ecef;opacity:1;cursor:no-drop}\n']
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: SelectDropDownService
    }];
  }, {
    _value: [{
      type: Input
    }],
    options: [{
      type: Input
    }],
    config: [{
      type: Input
    }],
    multiple: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    instanceId: [{
      type: Input
    }],
    selectedItemTemplate: [{
      type: Input
    }],
    optionItemTemplate: [{
      type: Input
    }],
    notFoundTemplate: [{
      type: Input
    }],
    dropdownButtonTemplate: [{
      type: Input
    }],
    change: [{
      type: Output
    }],
    searchChange: [{
      type: Output
    }],
    open: [{
      type: Output
    }],
    close: [{
      type: Output
    }],
    availableOptions: [{
      type: ViewChildren,
      args: ["availableOption"]
    }],
    clickInsideComponent: [{
      type: HostListener,
      args: ["click"]
    }],
    dropDownElement: [{
      type: ViewChild,
      args: ["dropdownList"]
    }],
    blur: [{
      type: HostListener,
      args: ["blur"]
    }],
    focus: [{
      type: HostListener,
      args: ["focus"]
    }],
    clickOutsideComponent: [{
      type: HostListener,
      args: ["document:click"]
    }],
    KeyPressOutsideComponent: [{
      type: HostListener,
      args: ["document:keydown"]
    }],
    tabindex: [{
      type: HostBinding,
      args: ["attr.tabindex"]
    }],
    handleKeyboardEvent: [{
      type: HostListener,
      args: ["keydown", ["$event"]]
    }]
  });
})();
var SelectDropDownModule = class {
};
SelectDropDownModule.ɵfac = function SelectDropDownModule_Factory(t) {
  return new (t || SelectDropDownModule)();
};
SelectDropDownModule.ɵmod = ɵɵdefineNgModule({
  type: SelectDropDownModule,
  declarations: [NgxSelectDropdownComponent, FilterByPipe, LimitToPipe],
  imports: [CommonModule, FormsModule],
  exports: [NgxSelectDropdownComponent, FilterByPipe, LimitToPipe]
});
SelectDropDownModule.ɵinj = ɵɵdefineInjector({
  imports: [CommonModule, FormsModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SelectDropDownModule, [{
    type: NgModule,
    args: [{
      declarations: [NgxSelectDropdownComponent, FilterByPipe, LimitToPipe],
      imports: [CommonModule, FormsModule],
      exports: [NgxSelectDropdownComponent, FilterByPipe, LimitToPipe],
      providers: []
    }]
  }], null, null);
})();
export {
  FilterByPipe,
  LimitToPipe,
  NgxSelectDropdownComponent,
  SelectDropDownModule,
  SelectDropDownService
};
//# sourceMappingURL=ngx-select-dropdown.js.map
