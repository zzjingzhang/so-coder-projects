import {
  NzToolTipComponent,
  NzTooltipBaseDirective
} from "./chunk-2KI4QXNA.js";
import {
  NzNoAnimationDirective
} from "./chunk-WFIDHXNV.js";
import {
  NzConnectedOverlayDirective,
  NzOverlayModule
} from "./chunk-PO26GSAF.js";
import {
  NzI18nModule,
  NzI18nPipe
} from "./chunk-NB77N67E.js";
import {
  zoomBigMotion
} from "./chunk-7WKTNO4S.js";
import {
  CdkConnectedOverlay,
  OverlayModule
} from "./chunk-NP4SM53Y.js";
import "./chunk-6IA2Q7AL.js";
import {
  NzButtonComponent,
  NzButtonModule
} from "./chunk-Q27IZADU.js";
import "./chunk-BIFSOPA3.js";
import {
  NzTransitionPatchDirective
} from "./chunk-GAHJ7I4D.js";
import {
  NzWaveDirective
} from "./chunk-YSEW7AMO.js";
import "./chunk-HEMSXRGE.js";
import "./chunk-XQ5IQ2ZD.js";
import "./chunk-EG65XBNP.js";
import {
  NzOutletModule,
  NzStringTemplateOutletDirective
} from "./chunk-FWGQHORL.js";
import {
  A11yModule,
  CdkTrapFocus
} from "./chunk-W6KF23XC.js";
import "./chunk-C3JHEKRK.js";
import "./chunk-GXTAKQM2.js";
import "./chunk-WAWYWQYF.js";
import {
  NzIconDirective,
  NzIconModule
} from "./chunk-K5IP7IV5.js";
import "./chunk-BQ76GOFF.js";
import "./chunk-FSEFOWPR.js";
import "./chunk-OWFHOKBU.js";
import "./chunk-EYJZJXV4.js";
import "./chunk-I6IINSYB.js";
import {
  WithConfig
} from "./chunk-D7HFUVTQ.js";
import {
  wrapIntoObservable
} from "./chunk-N7FDRY3Z.js";
import "./chunk-QFR6JUVD.js";
import "./chunk-7VY274S2.js";
import {
  DOCUMENT
} from "./chunk-I6TBLUI4.js";
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgModule,
  Output,
  ViewChildren,
  ViewEncapsulation,
  booleanAttribute,
  inject,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleMap,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-5M6545JQ.js";
import "./chunk-3LZ7TQJT.js";
import "./chunk-QCX4XGGK.js";
import {
  Subject,
  __esDecorate,
  __runInitializers,
  finalize,
  first,
  takeUntil
} from "./chunk-3SRVZXQZ.js";
import {
  __spreadValues
} from "./chunk-WDMUDEB6.js";

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-popconfirm.mjs
var _c0 = ["okBtn"];
var _c1 = ["cancelBtn"];
function NzPopconfirmComponent_ng_template_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 6);
    ɵɵelement(1, "span", 14);
    ɵɵelementEnd();
  }
}
function NzPopconfirmComponent_ng_template_0_ng_container_7_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "span", 17);
    ɵɵelement(2, "nz-icon", 18);
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const icon_r3 = ctx.$implicit;
    ɵɵadvance(2);
    ɵɵproperty("nzType", icon_r3 || "exclamation-circle");
  }
}
function NzPopconfirmComponent_ng_template_0_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, NzPopconfirmComponent_ng_template_0_ng_container_7_ng_container_1_Template, 3, 1, "ng-container", 15);
    ɵɵelementStart(2, "div", 16);
    ɵɵtext(3);
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r3 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("nzStringTemplateOutlet", ctx_r3.nzIcon);
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r3.nzTitle);
  }
}
function NzPopconfirmComponent_ng_template_0_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtext(0);
  }
  if (rf & 2) {
    const ctx_r3 = ɵɵnextContext(2);
    ɵɵtextInterpolate1(" ", ctx_r3.nzCancelText, " ");
  }
}
function NzPopconfirmComponent_ng_template_0_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtext(0);
    ɵɵpipe(1, "nzI18n");
  }
  if (rf & 2) {
    ɵɵtextInterpolate1(" ", ɵɵpipeBind1(1, 1, "Modal.cancelText"), " ");
  }
}
function NzPopconfirmComponent_ng_template_0_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtext(0);
  }
  if (rf & 2) {
    const ctx_r3 = ɵɵnextContext(2);
    ɵɵtextInterpolate1(" ", ctx_r3.nzOkText, " ");
  }
}
function NzPopconfirmComponent_ng_template_0_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtext(0);
    ɵɵpipe(1, "nzI18n");
  }
  if (rf & 2) {
    ɵɵtextInterpolate1(" ", ɵɵpipeBind1(1, 1, "Modal.okText"), " ");
  }
}
function NzPopconfirmComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 4)(1, "div", 5);
    ɵɵtemplate(2, NzPopconfirmComponent_ng_template_0_Conditional_2_Template, 2, 0, "div", 6);
    ɵɵelementStart(3, "div", 7)(4, "div")(5, "div", 8)(6, "div", 9);
    ɵɵtemplate(7, NzPopconfirmComponent_ng_template_0_ng_container_7_Template, 4, 2, "ng-container", 10);
    ɵɵelementEnd();
    ɵɵelementStart(8, "div", 11)(9, "button", 12, 1);
    ɵɵlistener("click", function NzPopconfirmComponent_ng_template_0_Template_button_click_9_listener() {
      ɵɵrestoreView(_r2);
      const ctx_r3 = ɵɵnextContext();
      return ɵɵresetView(ctx_r3.onCancel());
    });
    ɵɵtemplate(11, NzPopconfirmComponent_ng_template_0_Conditional_11_Template, 1, 1)(12, NzPopconfirmComponent_ng_template_0_Conditional_12_Template, 2, 3);
    ɵɵelementEnd();
    ɵɵelementStart(13, "button", 13, 2);
    ɵɵlistener("click", function NzPopconfirmComponent_ng_template_0_Template_button_click_13_listener() {
      ɵɵrestoreView(_r2);
      const ctx_r3 = ɵɵnextContext();
      return ɵɵresetView(ctx_r3.onConfirm());
    });
    ɵɵtemplate(15, NzPopconfirmComponent_ng_template_0_Conditional_15_Template, 1, 1)(16, NzPopconfirmComponent_ng_template_0_Conditional_16_Template, 2, 3);
    ɵɵelementEnd()()()()()()();
  }
  if (rf & 2) {
    const ctx_r3 = ɵɵnextContext();
    ɵɵstyleMap(ctx_r3.nzOverlayStyle);
    ɵɵclassMap(ctx_r3._classMap);
    ɵɵclassProp("ant-popover-rtl", ctx_r3.dir === "rtl");
    ɵɵproperty("cdkTrapFocusAutoCapture", ctx_r3.nzAutoFocus !== null)("@.disabled", !!(ctx_r3.noAnimation == null ? null : ctx_r3.noAnimation.nzNoAnimation))("nzNoAnimation", ctx_r3.noAnimation == null ? null : ctx_r3.noAnimation.nzNoAnimation)("@zoomBigMotion", "active");
    ɵɵadvance(2);
    ɵɵconditional(ctx_r3.nzPopconfirmShowArrow ? 2 : -1);
    ɵɵadvance(5);
    ɵɵproperty("nzStringTemplateOutlet", ctx_r3.nzTitle)("nzStringTemplateOutletContext", ctx_r3.nzTitleContext);
    ɵɵadvance(2);
    ɵɵproperty("nzSize", "small");
    ɵɵattribute("cdkFocusInitial", ctx_r3.nzAutoFocus === "cancel" || null);
    ɵɵadvance(2);
    ɵɵconditional(ctx_r3.nzCancelText ? 11 : 12);
    ɵɵadvance(2);
    ɵɵproperty("nzSize", "small")("nzType", ctx_r3.nzOkType !== "danger" ? ctx_r3.nzOkType : "primary")("nzDanger", ctx_r3.nzOkDanger || ctx_r3.nzOkType === "danger")("nzLoading", ctx_r3.confirmLoading)("disabled", ctx_r3.nzOkDisabled);
    ɵɵattribute("cdkFocusInitial", ctx_r3.nzAutoFocus === "ok" || null);
    ɵɵadvance(2);
    ɵɵconditional(ctx_r3.nzOkText ? 15 : 16);
  }
}
var NZ_CONFIG_MODULE_NAME = "popconfirm";
var NzPopconfirmDirective = (() => {
  let _classSuper = NzTooltipBaseDirective;
  let _nzPopconfirmBackdrop_decorators;
  let _nzPopconfirmBackdrop_initializers = [];
  let _nzPopconfirmBackdrop_extraInitializers = [];
  let _nzAutofocus_decorators;
  let _nzAutofocus_initializers = [];
  let _nzAutofocus_extraInitializers = [];
  return class NzPopconfirmDirective2 extends _classSuper {
    static {
      const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
      _nzPopconfirmBackdrop_decorators = [WithConfig()];
      _nzAutofocus_decorators = [WithConfig()];
      __esDecorate(null, null, _nzPopconfirmBackdrop_decorators, {
        kind: "field",
        name: "nzPopconfirmBackdrop",
        static: false,
        private: false,
        access: {
          has: (obj) => "nzPopconfirmBackdrop" in obj,
          get: (obj) => obj.nzPopconfirmBackdrop,
          set: (obj, value) => {
            obj.nzPopconfirmBackdrop = value;
          }
        },
        metadata: _metadata
      }, _nzPopconfirmBackdrop_initializers, _nzPopconfirmBackdrop_extraInitializers);
      __esDecorate(null, null, _nzAutofocus_decorators, {
        kind: "field",
        name: "nzAutofocus",
        static: false,
        private: false,
        access: {
          has: (obj) => "nzAutofocus" in obj,
          get: (obj) => obj.nzAutofocus,
          set: (obj, value) => {
            obj.nzAutofocus = value;
          }
        },
        metadata: _metadata
      }, _nzAutofocus_initializers, _nzAutofocus_extraInitializers);
      if (_metadata) Object.defineProperty(this, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata
      });
    }
    _nzModuleName = NZ_CONFIG_MODULE_NAME;
    /* eslint-disable @angular-eslint/no-input-rename, @angular-eslint/no-output-rename */
    arrowPointAtCenter;
    title;
    titleContext = null;
    directiveTitle;
    trigger = "click";
    placement = "top";
    origin;
    mouseEnterDelay;
    mouseLeaveDelay;
    overlayClassName;
    overlayStyle;
    visible;
    nzOkText;
    nzOkType;
    nzOkDisabled;
    nzOkDanger;
    nzCancelText;
    nzBeforeConfirm;
    nzIcon;
    nzCondition = false;
    nzPopconfirmShowArrow = true;
    nzPopconfirmBackdrop = __runInitializers(this, _nzPopconfirmBackdrop_initializers, false);
    nzAutofocus = (__runInitializers(this, _nzPopconfirmBackdrop_extraInitializers), __runInitializers(this, _nzAutofocus_initializers, null));
    directiveContent = (__runInitializers(this, _nzAutofocus_extraInitializers), null);
    content = null;
    overlayClickable;
    visibleChange = new EventEmitter();
    nzOnCancel = new EventEmitter();
    nzOnConfirm = new EventEmitter();
    getProxyPropertyMap() {
      return __spreadValues({
        nzOkText: ["nzOkText", () => this.nzOkText],
        nzOkType: ["nzOkType", () => this.nzOkType],
        nzOkDanger: ["nzOkDanger", () => this.nzOkDanger],
        nzOkDisabled: ["nzOkDisabled", () => this.nzOkDisabled],
        nzCancelText: ["nzCancelText", () => this.nzCancelText],
        nzBeforeConfirm: ["nzBeforeConfirm", () => this.nzBeforeConfirm],
        nzCondition: ["nzCondition", () => this.nzCondition],
        nzIcon: ["nzIcon", () => this.nzIcon],
        nzPopconfirmShowArrow: ["nzPopconfirmShowArrow", () => this.nzPopconfirmShowArrow],
        nzPopconfirmBackdrop: ["nzBackdrop", () => this.nzPopconfirmBackdrop],
        nzPopconfirmContext: ["nzTitleContext", () => this.titleContext],
        nzAutoFocus: ["nzAutoFocus", () => this.nzAutofocus]
      }, super.getProxyPropertyMap());
    }
    constructor() {
      super(NzPopconfirmComponent);
    }
    /**
     * @override
     */
    createComponent() {
      super.createComponent();
      this.component.nzOnCancel.pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.nzOnCancel.emit();
      });
      this.component.nzOnConfirm.pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.nzOnConfirm.emit();
      });
    }
    static ɵfac = function NzPopconfirmDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || NzPopconfirmDirective2)();
    };
    static ɵdir = ɵɵdefineDirective({
      type: NzPopconfirmDirective2,
      selectors: [["", "nz-popconfirm", ""]],
      hostVars: 2,
      hostBindings: function NzPopconfirmDirective_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassProp("ant-popover-open", ctx.visible);
        }
      },
      inputs: {
        arrowPointAtCenter: [2, "nzPopconfirmArrowPointAtCenter", "arrowPointAtCenter", booleanAttribute],
        title: [0, "nzPopconfirmTitle", "title"],
        titleContext: [0, "nzPopconfirmTitleContext", "titleContext"],
        directiveTitle: [0, "nz-popconfirm", "directiveTitle"],
        trigger: [0, "nzPopconfirmTrigger", "trigger"],
        placement: [0, "nzPopconfirmPlacement", "placement"],
        origin: [0, "nzPopconfirmOrigin", "origin"],
        mouseEnterDelay: [0, "nzPopconfirmMouseEnterDelay", "mouseEnterDelay"],
        mouseLeaveDelay: [0, "nzPopconfirmMouseLeaveDelay", "mouseLeaveDelay"],
        overlayClassName: [0, "nzPopconfirmOverlayClassName", "overlayClassName"],
        overlayStyle: [0, "nzPopconfirmOverlayStyle", "overlayStyle"],
        visible: [0, "nzPopconfirmVisible", "visible"],
        nzOkText: "nzOkText",
        nzOkType: "nzOkType",
        nzOkDisabled: [2, "nzOkDisabled", "nzOkDisabled", booleanAttribute],
        nzOkDanger: [2, "nzOkDanger", "nzOkDanger", booleanAttribute],
        nzCancelText: "nzCancelText",
        nzBeforeConfirm: "nzBeforeConfirm",
        nzIcon: "nzIcon",
        nzCondition: [2, "nzCondition", "nzCondition", booleanAttribute],
        nzPopconfirmShowArrow: [2, "nzPopconfirmShowArrow", "nzPopconfirmShowArrow", booleanAttribute],
        nzPopconfirmBackdrop: "nzPopconfirmBackdrop",
        nzAutofocus: "nzAutofocus"
      },
      outputs: {
        visibleChange: "nzPopconfirmVisibleChange",
        nzOnCancel: "nzOnCancel",
        nzOnConfirm: "nzOnConfirm"
      },
      exportAs: ["nzPopconfirm"],
      features: [ɵɵInheritDefinitionFeature]
    });
  };
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzPopconfirmDirective, [{
    type: Directive,
    args: [{
      selector: "[nz-popconfirm]",
      exportAs: "nzPopconfirm",
      host: {
        "[class.ant-popover-open]": "visible"
      }
    }]
  }], () => [], {
    arrowPointAtCenter: [{
      type: Input,
      args: [{
        alias: "nzPopconfirmArrowPointAtCenter",
        transform: booleanAttribute
      }]
    }],
    title: [{
      type: Input,
      args: ["nzPopconfirmTitle"]
    }],
    titleContext: [{
      type: Input,
      args: ["nzPopconfirmTitleContext"]
    }],
    directiveTitle: [{
      type: Input,
      args: ["nz-popconfirm"]
    }],
    trigger: [{
      type: Input,
      args: ["nzPopconfirmTrigger"]
    }],
    placement: [{
      type: Input,
      args: ["nzPopconfirmPlacement"]
    }],
    origin: [{
      type: Input,
      args: ["nzPopconfirmOrigin"]
    }],
    mouseEnterDelay: [{
      type: Input,
      args: ["nzPopconfirmMouseEnterDelay"]
    }],
    mouseLeaveDelay: [{
      type: Input,
      args: ["nzPopconfirmMouseLeaveDelay"]
    }],
    overlayClassName: [{
      type: Input,
      args: ["nzPopconfirmOverlayClassName"]
    }],
    overlayStyle: [{
      type: Input,
      args: ["nzPopconfirmOverlayStyle"]
    }],
    visible: [{
      type: Input,
      args: ["nzPopconfirmVisible"]
    }],
    nzOkText: [{
      type: Input
    }],
    nzOkType: [{
      type: Input
    }],
    nzOkDisabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzOkDanger: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzCancelText: [{
      type: Input
    }],
    nzBeforeConfirm: [{
      type: Input
    }],
    nzIcon: [{
      type: Input
    }],
    nzCondition: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzPopconfirmShowArrow: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzPopconfirmBackdrop: [{
      type: Input
    }],
    nzAutofocus: [{
      type: Input
    }],
    visibleChange: [{
      type: Output,
      args: ["nzPopconfirmVisibleChange"]
    }],
    nzOnCancel: [{
      type: Output
    }],
    nzOnConfirm: [{
      type: Output
    }]
  });
})();
var NzPopconfirmComponent = class _NzPopconfirmComponent extends NzToolTipComponent {
  elementRef;
  okBtn;
  cancelBtn;
  nzCancelText;
  nzCondition = false;
  nzPopconfirmShowArrow = true;
  nzIcon;
  nzOkText;
  nzOkType = "primary";
  nzOkDanger = false;
  nzOkDisabled = false;
  nzAutoFocus = null;
  nzBeforeConfirm = null;
  nzOnCancel = new Subject();
  nzOnConfirm = new Subject();
  _trigger = "click";
  elementFocusedBeforeModalWasOpened = null;
  document = inject(DOCUMENT);
  _prefix = "ant-popover";
  confirmLoading = false;
  constructor(elementRef) {
    super();
    this.elementRef = elementRef;
  }
  ngOnDestroy() {
    super.ngOnDestroy();
    this.nzOnCancel.complete();
    this.nzOnConfirm.complete();
  }
  /**
   * @override
   */
  show() {
    if (!this.nzCondition) {
      this.capturePreviouslyFocusedElement();
      super.show();
    } else {
      this.onConfirm();
    }
  }
  hide() {
    super.hide();
    this.restoreFocus();
  }
  handleConfirm() {
    this.nzOnConfirm.next();
    super.hide();
  }
  onCancel() {
    this.nzOnCancel.next();
    super.hide();
  }
  onConfirm() {
    if (this.nzBeforeConfirm) {
      const observable = wrapIntoObservable(this.nzBeforeConfirm()).pipe(first());
      this.confirmLoading = true;
      observable.pipe(finalize(() => {
        this.confirmLoading = false;
        this.cdr.markForCheck();
      }), takeUntil(this.nzVisibleChange), takeUntil(this.destroy$)).subscribe((value) => {
        if (value) {
          this.handleConfirm();
        }
      });
    } else {
      this.handleConfirm();
    }
  }
  capturePreviouslyFocusedElement() {
    if (this.document) {
      this.elementFocusedBeforeModalWasOpened = this.document.activeElement;
    }
  }
  restoreFocus() {
    const toFocus = this.elementFocusedBeforeModalWasOpened;
    if (toFocus && typeof toFocus.focus === "function") {
      const activeElement = this.document.activeElement;
      const element = this.elementRef.nativeElement;
      if (!activeElement || activeElement === this.document.body || activeElement === element || element.contains(activeElement)) {
        toFocus.focus();
      }
    }
  }
  static ɵfac = function NzPopconfirmComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzPopconfirmComponent)(ɵɵdirectiveInject(ElementRef));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _NzPopconfirmComponent,
    selectors: [["nz-popconfirm"]],
    viewQuery: function NzPopconfirmComponent_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c0, 5, ElementRef);
        ɵɵviewQuery(_c1, 5, ElementRef);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.okBtn = _t);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.cancelBtn = _t);
      }
    },
    exportAs: ["nzPopconfirmComponent"],
    features: [ɵɵInheritDefinitionFeature],
    decls: 2,
    vars: 6,
    consts: [["overlay", "cdkConnectedOverlay"], ["cancelBtn", ""], ["okBtn", ""], ["cdkConnectedOverlay", "", "nzConnectedOverlay", "", 3, "overlayOutsideClick", "detach", "positionChange", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayOpen", "cdkConnectedOverlayPush", "nzArrowPointAtCenter"], ["cdkTrapFocus", "", 1, "ant-popover", 3, "cdkTrapFocusAutoCapture", "nzNoAnimation"], [1, "ant-popover-content"], [1, "ant-popover-arrow"], [1, "ant-popover-inner"], [1, "ant-popover-inner-content"], [1, "ant-popover-message"], [4, "nzStringTemplateOutlet", "nzStringTemplateOutletContext"], [1, "ant-popover-buttons"], ["nz-button", "", 3, "click", "nzSize"], ["nz-button", "", 3, "click", "nzSize", "nzType", "nzDanger", "nzLoading", "disabled"], [1, "ant-popover-arrow-content"], [4, "nzStringTemplateOutlet"], [1, "ant-popover-message-title"], [1, "ant-popover-message-icon"], ["nzTheme", "fill", 3, "nzType"]],
    template: function NzPopconfirmComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = ɵɵgetCurrentView();
        ɵɵtemplate(0, NzPopconfirmComponent_ng_template_0_Template, 17, 23, "ng-template", 3, 0, ɵɵtemplateRefExtractor);
        ɵɵlistener("overlayOutsideClick", function NzPopconfirmComponent_Template_ng_template_overlayOutsideClick_0_listener($event) {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.onClickOutside($event));
        })("detach", function NzPopconfirmComponent_Template_ng_template_detach_0_listener() {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.hide());
        })("positionChange", function NzPopconfirmComponent_Template_ng_template_positionChange_0_listener($event) {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.onPositionChange($event));
        });
      }
      if (rf & 2) {
        ɵɵproperty("cdkConnectedOverlayHasBackdrop", ctx.nzBackdrop)("cdkConnectedOverlayOrigin", ctx.origin)("cdkConnectedOverlayPositions", ctx._positions)("cdkConnectedOverlayOpen", ctx._visible)("cdkConnectedOverlayPush", ctx.cdkConnectedOverlayPush)("nzArrowPointAtCenter", ctx.nzArrowPointAtCenter);
      }
    },
    dependencies: [OverlayModule, CdkConnectedOverlay, NzOverlayModule, NzConnectedOverlayDirective, A11yModule, CdkTrapFocus, NzNoAnimationDirective, NzOutletModule, NzStringTemplateOutletDirective, NzIconModule, NzIconDirective, NzButtonModule, NzButtonComponent, NzTransitionPatchDirective, NzWaveDirective, NzI18nModule, NzI18nPipe],
    encapsulation: 2,
    data: {
      animation: [zoomBigMotion]
    },
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzPopconfirmComponent, [{
    type: Component,
    args: [{
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      selector: "nz-popconfirm",
      exportAs: "nzPopconfirmComponent",
      preserveWhitespaces: false,
      animations: [zoomBigMotion],
      template: `
    <ng-template
      #overlay="cdkConnectedOverlay"
      cdkConnectedOverlay
      nzConnectedOverlay
      [cdkConnectedOverlayHasBackdrop]="nzBackdrop"
      [cdkConnectedOverlayOrigin]="origin"
      (overlayOutsideClick)="onClickOutside($event)"
      (detach)="hide()"
      (positionChange)="onPositionChange($event)"
      [cdkConnectedOverlayPositions]="_positions"
      [cdkConnectedOverlayOpen]="_visible"
      [cdkConnectedOverlayPush]="cdkConnectedOverlayPush"
      [nzArrowPointAtCenter]="nzArrowPointAtCenter"
    >
      <div
        cdkTrapFocus
        [cdkTrapFocusAutoCapture]="nzAutoFocus !== null"
        class="ant-popover"
        [class]="_classMap"
        [class.ant-popover-rtl]="dir === 'rtl'"
        [style]="nzOverlayStyle"
        [@.disabled]="!!noAnimation?.nzNoAnimation"
        [nzNoAnimation]="noAnimation?.nzNoAnimation"
        [@zoomBigMotion]="'active'"
      >
        <div class="ant-popover-content">
          @if (nzPopconfirmShowArrow) {
            <div class="ant-popover-arrow">
              <span class="ant-popover-arrow-content"></span>
            </div>
          }
          <div class="ant-popover-inner">
            <div>
              <div class="ant-popover-inner-content">
                <div class="ant-popover-message">
                  <ng-container *nzStringTemplateOutlet="nzTitle; context: nzTitleContext">
                    <ng-container *nzStringTemplateOutlet="nzIcon; let icon">
                      <span class="ant-popover-message-icon">
                        <nz-icon [nzType]="icon || 'exclamation-circle'" nzTheme="fill" />
                      </span>
                    </ng-container>
                    <div class="ant-popover-message-title">{{ nzTitle }}</div>
                  </ng-container>
                </div>
                <div class="ant-popover-buttons">
                  <button
                    nz-button
                    #cancelBtn
                    [nzSize]="'small'"
                    (click)="onCancel()"
                    [attr.cdkFocusInitial]="nzAutoFocus === 'cancel' || null"
                  >
                    @if (nzCancelText) {
                      {{ nzCancelText }}
                    } @else {
                      {{ 'Modal.cancelText' | nzI18n }}
                    }
                  </button>
                  <button
                    nz-button
                    #okBtn
                    [nzSize]="'small'"
                    [nzType]="nzOkType !== 'danger' ? nzOkType : 'primary'"
                    [nzDanger]="nzOkDanger || nzOkType === 'danger'"
                    [nzLoading]="confirmLoading"
                    [disabled]="nzOkDisabled"
                    (click)="onConfirm()"
                    [attr.cdkFocusInitial]="nzAutoFocus === 'ok' || null"
                  >
                    @if (nzOkText) {
                      {{ nzOkText }}
                    } @else {
                      {{ 'Modal.okText' | nzI18n }}
                    }
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ng-template>
  `,
      imports: [OverlayModule, NzOverlayModule, A11yModule, NzNoAnimationDirective, NzOutletModule, NzIconModule, NzButtonModule, NzI18nModule]
    }]
  }], () => [{
    type: ElementRef
  }], {
    okBtn: [{
      type: ViewChildren,
      args: ["okBtn", {
        read: ElementRef
      }]
    }],
    cancelBtn: [{
      type: ViewChildren,
      args: ["cancelBtn", {
        read: ElementRef
      }]
    }]
  });
})();
var NzPopconfirmModule = class _NzPopconfirmModule {
  static ɵfac = function NzPopconfirmModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzPopconfirmModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _NzPopconfirmModule,
    imports: [NzPopconfirmComponent, NzPopconfirmDirective],
    exports: [NzPopconfirmComponent, NzPopconfirmDirective]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [NzPopconfirmComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzPopconfirmModule, [{
    type: NgModule,
    args: [{
      imports: [NzPopconfirmComponent, NzPopconfirmDirective],
      exports: [NzPopconfirmComponent, NzPopconfirmDirective]
    }]
  }], null, null);
})();
export {
  NzPopconfirmComponent,
  NzPopconfirmDirective,
  NzPopconfirmModule
};
//# sourceMappingURL=ng-zorro-antd_popconfirm.js.map
