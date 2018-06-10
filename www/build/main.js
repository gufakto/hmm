webpackJsonp([8],{

/***/ 114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_common_common__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_config_config__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_signalr_no_jquery__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_signalr_no_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_signalr_no_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_login_login__ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ChatingPage = (function () {
    function ChatingPage(navCtrl, navParams, common, config, auth) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.common = common;
        this.config = config;
        this.auth = auth;
        this.showEmojiPicker = false;
        this._dateNow = new Date().toISOString();
        var parent = this;
        setTimeout(function () {
            _this.connectionChat();
        }, 3000);
        this.config.getProfile()
            .then(function (email) {
            _this._email = email;
        });
        this.getPhoto();
    }
    ChatingPage.prototype.connectionChat = function () {
        var parent = this;
        this.connection = Object(__WEBPACK_IMPORTED_MODULE_4_signalr_no_jquery__["hubConnection"])('http://www.mor2plg.id/buset/');
        this.proxy = this.connection.createHubProxy('serverChat');
        this.proxy.on('usersOnline', function (users) {
            parent._users = users;
        });
        this.proxy.on('messageRecieved', function (msgs) {
            parent.msgList = msgs;
        });
        parent.common.showLoading();
        this.connection.start().done(function (data) {
            parent._connId = data.id;
            parent.common.presentToast('Conneced' + data.transport.name + ', ID: ' + data.id);
            parent.common.stopLoading();
            var User = {
                UserId: data.id,
                Email: parent._email,
                Name: parent._email.substring(0, parent._email.indexOf('@')),
                GroupName: parent._email,
                Photo: null,
                IsMember: true
            };
            parent.proxy.invoke('JoinUser', User);
        }).fail(function (err) {
            parent.common.presentToast('Error: ' + err);
            parent.common.stopLoading();
        });
    };
    ChatingPage.prototype.getPhoto = function () {
        var _this = this;
        this.common.showLoading();
        this.common.presentToast('Load data photo...');
        this.auth.getPhotoByEmail(this._email)
            .then(function (photo) {
            _this._photo = photo;
            _this.common.stopLoading();
        }, function (err) {
            _this.common.presentToast("gagal menngambil photo profil");
            _this.common.stopLoading();
        });
    };
    ChatingPage.prototype.ionViewDidLoad = function () {
    };
    ChatingPage.prototype.ionViewDidEnter = function () {
    };
    ChatingPage.prototype.ionViewWillLeave = function () {
        __WEBPACK_IMPORTED_MODULE_4_signalr_no_jquery__["hubConnection"].stop();
    };
    ChatingPage.prototype.toMessage = function (Name, UserId) {
        this.common.showLoading();
        this._activeRoom = true;
        this._nameToRoom = Name;
        this._userIdToRoom = UserId;
        this.common.stopLoading();
    };
    ChatingPage.prototype.backtoUsers = function () {
        this.common.showLoading();
        this._activeRoom = false;
        this.common.stopLoading();
    };
    ChatingPage.prototype.sendMsg = function () {
        if (!this.editorMsg.trim())
            return;
        var User = {
            UserId: this._connId,
            Email: this._email,
            Name: this._email.substr(0, this._email.indexOf('@')),
            GroupName: this._email,
            IsMember: true,
            Photo: this._photo
        };
        this.proxy.invoke('ServerMessage', User, this._userIdToRoom, this.editorMsg);
        this.editorMsg = '';
        if (!this.showEmojiPicker) {
            this.focus();
        }
    };
    ChatingPage.prototype.onFocus = function () {
        this.showEmojiPicker = false;
        this.content.resize();
        this.scrollToBottom();
    };
    ChatingPage.prototype.scrollToBottom = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.content.scrollToBottom) {
                _this.content.scrollToBottom();
            }
        }, 400);
    };
    ChatingPage.prototype.switchEmojiPicker = function () {
        this.showEmojiPicker = !this.showEmojiPicker;
        if (!this.showEmojiPicker) {
            this.focus();
        }
        else {
            this.setTextareaScroll();
        }
        this.content.resize();
        this.scrollToBottom();
    };
    ChatingPage.prototype.setTextareaScroll = function () {
        var textarea = this.messageInput.nativeElement;
        textarea.scrollTop = textarea.scrollHeight;
    };
    ChatingPage.prototype.focus = function () {
        if (this.messageInput && this.messageInput.nativeElement) {
            this.messageInput.nativeElement.focus();
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */])
    ], ChatingPage.prototype, "content", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('chat_input'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], ChatingPage.prototype, "messageInput", void 0);
    ChatingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-chating',template:/*ion-inline-start:"C:\Users\LENOVO YOGA\ProjectIonic\buset\src\pages\chating\chating.html"*/`<ion-header>\n\n	<ion-navbar color="red">\n		<ion-title *ngIf="!_activeRoom">BSO CHATING</ion-title>\n		<ion-title *ngIf="_activeRoom">BSO {{_name | uppercase}}</ion-title>\n		<ion-buttons end color="danger" (click)="backtoUsers()" *ngIf="_activeRoom">\n			<button ion-button icon-only>\n				<ion-icon name="contacts"></ion-icon>\n			</button>\n		</ion-buttons>\n	</ion-navbar>\n\n</ion-header>\n\n<!-- Chat Room -->\n<ion-content no-padding *ngIf="!_activeRoom">\n	<ion-list>\n		<ion-list-header>Admin Online</ion-list-header>\n		<div *ngFor="let usr of _users">\n			<ion-item *ngIf="usr.IsMember==false" (click)="toMessage(usr.Name, usr.UserId)">\n				<ion-avatar item-start>\n					<img src="{{ usr.Photo|showimage }}" alt="{{ usr.Email }}">\n				</ion-avatar>\n				<h2>{{ usr.Name }}</h2>\n				<p> Online </p>\n			</ion-item>\n		</div>\n	</ion-list>\n</ion-content>\n\n<ion-content *ngIf="_activeRoom">\n\n	<div class="message-wrap">\n \n	  <div *ngFor="let msg of msgList"\n			 class="message"\n			 [class.left]=" msg.ToUser === _connId "\n			 [class.right]=" msg.ToUser === _userIdToRoom ">\n		 <img class="user-img" [src]="msg.Photo | showimage" alt="Profile">\n		 <!--ion-spinner name="dots" *ngIf="msg.IsRead === false"></ion-spinner-->\n		 <div class="msg-detail">\n			<div class="msg-info">\n			  <p>\n				 {{msg.UserInfo.Name}}&nbsp;&nbsp;&nbsp;{{_dateNow | relativeTime}}</p>\n			</div>\n			<div class="msg-content">\n			  <span class="triangle"></span>\n			  <p class="line-breaker ">{{msg.Message}}</p>\n			</div>\n		 </div>\n	  </div>\n \n	</div> \n \n </ion-content>\n \n <ion-footer no-border [style.height]="showEmojiPicker ? \'255px\' : \'55px\'" *ngIf="_activeRoom">\n	<div class="input-wrap">\n	  <button ion-button clear icon-only item-right (click)="switchEmojiPicker()">\n		 <ion-icon name="md-happy"></ion-icon>\n	  </button>\n	  <textarea #chat_input\n					placeholder="Text Input"\n					[(ngModel)]="editorMsg"\n					(keyup.enter)="sendMsg()"\n					(focusin)="onFocus()">\n	  </textarea>\n	  <button ion-button clear icon-only item-right (click)="sendMsg()">\n		 <ion-icon name="ios-send" ios="ios-send" md="md-send"></ion-icon>\n	  </button>\n	</div>\n	<emoji-picker [(ngModel)]="editorMsg"></emoji-picker>\n </ion-footer>\n`/*ion-inline-end:"C:\Users\LENOVO YOGA\ProjectIonic\buset\src\pages\chating\chating.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_common_common__["a" /* CommonProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_config_config__["a" /* ConfigProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_login_login__["a" /* LoginProvider */]])
    ], ChatingPage);
    return ChatingPage;
}());

//# sourceMappingURL=chating.js.map

/***/ }),

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomerSearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_common_common__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_login_login__ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CustomerSearchPage = (function () {
    function CustomerSearchPage(navCtrl, navParams, common, reg, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.common = common;
        this.reg = reg;
        this.viewCtrl = viewCtrl;
        this._resultIf = false;
    }
    CustomerSearchPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CustomerSearchPage');
    };
    CustomerSearchPage.prototype.appendItem = function (id, nama) {
        if (id === void 0) { id = 0; }
        if (nama === void 0) { nama = ''; }
        this.viewCtrl.dismiss({ id: id, nama: nama });
    };
    CustomerSearchPage.prototype.onInput = function (ev) {
        var _this = this;
        this._loading = true;
        console.log(this._search);
        this._resultIf = true;
        this.reg.searchCustomer(this._search)
            .then(function (res) {
            _this._listSearch = JSON.parse(res);
            _this._loading = false;
        }).catch(function (err) {
            _this.common.presentAlert('Error', 'Data tidak ada..');
            _this._loading = false;
        });
        this.focus();
    };
    CustomerSearchPage.prototype.onCancel = function (ev) {
        this._loading = true;
        this._resultIf = false;
        this._loading = false;
    };
    CustomerSearchPage.prototype.focus = function () {
        if (this.searchInput && this.searchInput.nativeElement) {
            this.searchInput.nativeElement.focus();
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('search_input'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], CustomerSearchPage.prototype, "searchInput", void 0);
    CustomerSearchPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-customer-search',template:/*ion-inline-start:"C:\Users\LENOVO YOGA\ProjectIonic\buset\src\pages\customer-search\customer-search.html"*/`<ion-content no-padding>\n  <ion-searchbar placeholder="Ketik Nama Customer / Vendor" [(ngModel)]="_search" (ionInput)="onInput($event)" (onCancel)="onCancel($event)" #search_input></ion-searchbar>\n\n  <ion-spinner name="bubbles" style="width: 28px; height: 28px;" color="danger" *ngIf="_loading"></ion-spinner>\n\n<ion-list *ngIf="_resultIf">\n  <button clear ion-item *ngFor="let item of _listSearch" (click)="appendItem(item.Id , item.Nama)">{{item.Nama}} - {{item.Tipe}}</button>  \n</ion-list>\n</ion-content>\n`/*ion-inline-end:"C:\Users\LENOVO YOGA\ProjectIonic\buset\src\pages\customer-search\customer-search.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_common_common__["a" /* CommonProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_login_login__["a" /* LoginProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */]])
    ], CustomerSearchPage);
    return CustomerSearchPage;
}());

//# sourceMappingURL=customer-search.js.map

/***/ }),

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetailBuktiPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_common_common__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_history_history__ = __webpack_require__(91);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DetailBuktiPage = (function () {
    function DetailBuktiPage(navCtrl, navParams, common, history) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.common = common;
        this.history = history;
        this._id = this.navParams.get('id');
    }
    DetailBuktiPage.prototype.ionViewDidLoad = function () {
        this.loadData();
    };
    DetailBuktiPage.prototype.loadData = function () {
        var _this = this;
        this.common.showLoading();
        this.history.getDetailBukti(this._id)
            .then(function (res) {
            var detail = JSON.parse(res);
            _this.Attachment = detail.Attachment;
            _this.Vendor = detail.Vendor;
            _this.JumlahSetor = detail.JumlahSetor;
            _this.Sosa = detail.Sosa;
            _this.TanggalSetor = detail.TanggalSetor;
            _this.ApprovedBy = detail.ApprovedBy;
            _this.Keterangan = detail.Keterangan;
            _this.common.stopLoading();
        }, function (err) {
            console.log(err);
            _this.common.presentAlert('Error', 'Terjadi kesalahan saat mengambil data');
            _this.common.stopLoading();
        });
    };
    DetailBuktiPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-detail-bukti',template:/*ion-inline-start:"C:\Users\LENOVO YOGA\ProjectIonic\buset\src\pages\detail-bukti\detail-bukti.html"*/`<!-- -->\n<ion-header>\n\n	<ion-navbar  color="primary">\n		<ion-title>\n			<span ion-text>BSO DETAIL LIST</span>\n		</ion-title>\n	</ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n	<div class="container">\n		<img src="{{Attachment | showimage}}" alt="{{Vendor}}">\n	</div>\n	<hr/>\n	<div class="content-detail">\n		<ion-grid>\n			<ion-row>\n				<ion-col col-6>\n					<ion-label><b>Total Setor</b></ion-label>\n				</ion-col>\n				<ion-col col-6>\n					<ion-label>{{ JumlahSetor | currency: \'Rp.\':true:\'1.2-2\' }}</ion-label>\n				</ion-col>\n			</ion-row>\n			\n			<ion-row>\n				<ion-col col-6>\n					<ion-label><b>Vendor</b></ion-label>\n				</ion-col>\n				<ion-col col-6>\n					<ion-label>{{Vendor}}</ion-label>\n				</ion-col>\n			</ion-row>\n\n			<ion-row>\n				<ion-col col-6>\n					<ion-label><b>Tanggal Setor</b></ion-label>\n				</ion-col>\n				<ion-col col-6>\n					<ion-label>{{TanggalSetor | date:\'dd/MM/yyyy\'}}</ion-label>\n				</ion-col>\n			</ion-row>\n			\n			<ion-row>\n				<ion-col col-6>\n					<ion-label><b>Sosa</b></ion-label>\n				</ion-col>\n				<ion-col col-6>\n					<ion-label>{{Sosa}}</ion-label>\n				</ion-col>\n			</ion-row>\n			\n			<ion-row>\n				<ion-col col-6>\n					<ion-label><b>Approve Oleh</b></ion-label>\n				</ion-col>\n				<ion-col col-6>\n					<ion-label>{{ApprovedBy}}</ion-label>\n				</ion-col>\n			</ion-row>\n			<ion-row>\n				<ion-col col-12>\n					<ion-label><b>Keterangan</b></ion-label>\n				</ion-col>\n				<ion-col col-12>\n					<p>{{Keterangan}}</p>\n				</ion-col>\n			</ion-row>\n\n		</ion-grid>\n	</div>\n</ion-content>\n`/*ion-inline-end:"C:\Users\LENOVO YOGA\ProjectIonic\buset\src\pages\detail-bukti\detail-bukti.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_common_common__["a" /* CommonProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_history_history__["a" /* HistoryProvider */]])
    ], DetailBuktiPage);
    return DetailBuktiPage;
}());

//# sourceMappingURL=detail-bukti.js.map

/***/ }),

/***/ 117:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HistoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_history_history__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_common_common__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_config_config__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__detail_bukti_detail_bukti__ = __webpack_require__(116);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HistoryPage = (function () {
    function HistoryPage(navCtrl, navParams, history, common, config) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.history = history;
        this.common = common;
        this.config = config;
        this.config.getLevel()
            .then(function (level) {
            _this._level = level;
        });
        this.config.getCustId().then(function (custId) {
            _this._custId = custId;
        });
    }
    HistoryPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.common.showLoading();
        setTimeout(function () {
            _this.loadData();
            _this.common.stopLoading();
        }, 3000);
    };
    HistoryPage.prototype.loadData = function () {
        var _this = this;
        if (this._level == "Admin") {
            this.history.getHistoryByLogin()
                .then(function (res) {
                _this._bukti = JSON.parse(res);
            }, function (err) {
                console.log(err);
                _this.common.presentAlert('Error', 'Gagal mengambil data dari server');
            });
        }
        else {
            this.history.getByCustomer(this._custId)
                .then(function (res) {
                _this._bukti = JSON.parse(res);
            }, function (err) {
                console.log(err);
                _this.common.presentAlert('Error', 'Gagal mengambil data dari server...');
            });
        }
    };
    HistoryPage.prototype.detailBukti = function (id) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__detail_bukti_detail_bukti__["a" /* DetailBuktiPage */], { id: id });
    };
    HistoryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-history',template:/*ion-inline-start:"C:\Users\LENOVO YOGA\ProjectIonic\buset\src\pages\history\history.html"*/`<ion-header>\n\n	<ion-navbar color="danger">\n		<ion-title>BSO LIST</ion-title>\n	</ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n	<ion-list *ngFor="let bukti of _bukti">\n		<ion-item (click)="detailBukti(bukti.Id)">\n			<ion-avatar item-start>\n				<img src="{{bukti.Attachment | showimage}}"/>\n			</ion-avatar>\n			<h2>{{bukti.Vendor}}</h2>\n			<h3>{{bukti.JumlahSetor | currency:\'Rp.\':true:\'1.2-2\'}}</h3>\n			<p>{{bukti.TanggalSetor | date: \'dd/MM/yyyy\'}}</p>\n		</ion-item>\n	</ion-list>\n</ion-content>\n`/*ion-inline-end:"C:\Users\LENOVO YOGA\ProjectIonic\buset\src\pages\history\history.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_history_history__["a" /* HistoryProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_common_common__["a" /* CommonProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_config_config__["a" /* ConfigProvider */]])
    ], HistoryPage);
    return HistoryPage;
}());

//# sourceMappingURL=history.js.map

/***/ }),

/***/ 118:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_common_common__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_login_login__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__customer_search_customer_search__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__ = __webpack_require__(56);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var RegisterPage = (function () {
    function RegisterPage(navCtrl, navParams, formBuilder, camera, prop, common, reg) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.camera = camera;
        this.prop = prop;
        this.common = common;
        this.reg = reg;
        this.PhotoDisplay = null;
        this.FormRegister = this.formBuilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(70), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(30), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            level: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            customerid: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            contactperson: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            contactperson1: ['']
        });
        this.email = this.FormRegister.controls['email'];
        this.password = this.FormRegister.controls['password'];
        this.level = this.FormRegister.controls['level'];
        this.customerid = this.FormRegister.controls['customerid'];
        this.contactperson = this.FormRegister.controls['contactperson'];
        this.contactperson1 = this.FormRegister.controls['contactperson1'];
    }
    RegisterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegisterPage');
    };
    RegisterPage.prototype.browse = function () {
        var _this = this;
        var options = {
            quality: 20,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(options).then(function (img) {
            _this.PhotoDisplay = 'data:image/png;base64,' + img;
        }, function (err) {
            console.log(err);
        });
        console.log(this.PhotoDisplay);
    };
    RegisterPage.prototype.searching = function () {
        var _this = this;
        var propover = this.prop.create(__WEBPACK_IMPORTED_MODULE_6__customer_search_customer_search__["a" /* CustomerSearchPage */], {}, {
            cssClass: 'proper-customer'
        });
        propover.onDidDismiss(function (data) {
            if (data.hasOwnProperty('nama')) {
                _this.customer = data.nama;
                _this._customerId = data.id;
            }
        });
        propover.present();
    };
    RegisterPage.prototype.simpan = function () {
        var _this = this;
        var UserReg = {
            Email: this.FormRegister.value.email,
            Password: this.FormRegister.value.password,
            Level: this.FormRegister.value.level,
            CreatedDate: new Date().toISOString(),
            UpdatedDate: new Date().toISOString(),
            StatusLogin: 0,
            CustomerId: this._customerId,
            ApprovedBy: null,
            ContactPerson: this.FormRegister.value.contactperson,
            ContactPerson1: this.FormRegister.value.contactperson1,
            NoCustomer: '0000',
            Photo: this.PhotoDisplay ? this.PhotoDisplay : null
        };
        console.log(UserReg);
        this.common.showLoading();
        this.reg.daftarUserBaru(UserReg)
            .then(function (res) {
            _this.common.stopLoading();
            _this.common.presentAlert('Sukses', 'Sukses mendaftarkan data baru');
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
        }).catch(function (err) {
            _this.common.stopLoading();
            _this.common.presentToast('Gagal mendaftarkan user baru. Silahkan Coba lagi');
        });
    };
    RegisterPage.prototype.setLogin = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
    };
    RegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-register',template:/*ion-inline-start:"C:\Users\LENOVO YOGA\ProjectIonic\buset\src\pages\register\register.html"*/`<ion-header>\n  <ion-navbar text-center>\n    <ion-title>\n      <img src="assets/imgs/pertamina-logo-shadow.png" alt="Logo" class="title-image">\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n<ion-input type="hidden" [(ngModel)]="_customerId"></ion-input>\n<form novalidate="true" [formGroup]="FormRegister">\n  <ion-list>\n    <ion-item *ngIf="PhotoDisplay == null">\n      <ion-buttons (click)="browse()">\n        <button ion-button full colod="danger">\n          Browse &nbsp;&nbsp;&nbsp;\n          <ion-icon name="attach" right></ion-icon>\n        </button>\n      </ion-buttons>\n    </ion-item>\n\n    <ion-item *ngIf="PhotoDisplay != null">\n      <img src="{{PhotoDisplay}}" alt="register Photo">\n    </ion-item>\n    \n    <ion-item>\n      <ion-label floating>Email</ion-label>\n      <ion-input type="email" autocomplete="off" formControlName="email" [class.invalid]="!FormRegister.controls.email.valid && (FormRegister.controls.email.dirty)"></ion-input>\n    </ion-item>\n    <ion-item *ngIf="!FormRegister.controls.email.valid  && (FormRegister.controls.email.dirty)">\n      <p><small style="font-size: 10px;color: red;"><i>*Please enter a valid email.</i></small></p>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Password</ion-label>\n      <ion-input type="password" autocomplete="off" formControlName="password" [class.invalid]="!FormRegister.controls.password.valid && (FormRegister.controls.password.dirty)"></ion-input>\n    </ion-item>\n    <ion-item *ngIf="!FormRegister.controls.password.valid  && (FormRegister.controls.password.dirty)">\n      <p><small style="font-size: 10px;color: red;"><i>*Please enter a valid password, min 6 characters.</i></small></p>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Level</ion-label>\n      <ion-select formControlName="level" [class.invalid]="!FormRegister.controls.level.valid && (!FormRegister.controls.level.dirty)">\n        <ion-option value="Admin">Admin</ion-option>\n        <ion-option value="Manager">Manager</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item *ngIf="!FormRegister.controls.level.valid  && (FormRegister.controls.level.dirty)">\n      <p><small style="font-size: 10px;color: red;"><i>*level required.</i></small></p>\n    </ion-item>\n    \n    <ion-item>\n      <ion-label floating>Customer</ion-label>\n      <ion-input [(ngModel)]="customer" formControlName="customerid" [class.invalid]="!FormRegister.controls.customerid.valid && (FormRegister.controls.customerid.dirty)"></ion-input>\n      <button ion-button color="danger" (click)="searching()" item-end>Browse</button>\n    </ion-item>\n    <ion-item>\n      <p style="fonr-size: 10px; color: green;">\n        <small>*Silahkan check terlebih dahulu nama PT anda </small>\n      </p>\n    </ion-item>\n\n    \n    <ion-item *ngIf="!FormRegister.controls.customerid.valid  && (FormRegister.controls.customerid.dirty)">\n      <p><small style="font-size: 10px;color: red;"><i>*Pilih Customer / vendor.</i></small></p>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Contact Person</ion-label>\n      <ion-input type="text" formControlName="contactperson" [class.invalid]="!FormRegister.controls.contactperson.valid && (FormRegister.controls.contactperson.dirty)"></ion-input>\n    </ion-item>\n    <ion-item *ngIf="!FormRegister.controls.contactperson.valid  && (FormRegister.controls.contactperson.dirty)">\n      <p><small style="font-size: 10px;color: red;"><i>*Input nomor telepon.</i></small></p>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Contac Person Opsional</ion-label>\n      <ion-input type="text" formControlName="contactperson1" [class.invalid]="!FormRegister.controls.contactperson1.valid && (FormRegister.controls.contactperson1.dirty)"></ion-input>\n    </ion-item>\n    \n    <ion-item>\n      <ion-buttons (click)="simpan()">\n        <button ion-button full colod="danger">\n          Simpan\n        </button>\n      </ion-buttons>\n    </ion-item>\n  </ion-list>\n</form>\n<div class="host-button">\n  <button ion-button clear color="danger" (click)="setLogin()">Login</button>\n</div>\n</ion-content>\n`/*ion-inline-end:"C:\Users\LENOVO YOGA\ProjectIonic\buset\src\pages\register\register.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* PopoverController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_common_common__["a" /* CommonProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_login_login__["a" /* LoginProvider */]])
    ], RegisterPage);
    return RegisterPage;
}());

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UtamaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_login_login__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_config_config__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_common_common__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__chating_chating__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__setting_setting__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__history_history__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__upload_upload__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_email_composer__ = __webpack_require__(193);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var UtamaPage = (function () {
    function UtamaPage(navCtrl, navParams, auth, config, mail, common) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.auth = auth;
        this.config = config;
        this.mail = mail;
        this.common = common;
        this.config.getLevel().then(function (lvl) {
            _this._level = lvl;
        });
    }
    UtamaPage.prototype.ionViewDidLoad = function () {
    };
    UtamaPage.prototype.ionViewDidEnter = function () {
        this.getPhoto();
    };
    UtamaPage.prototype.getPhoto = function () {
        var _this = this;
        this._loadPhoto = true;
        this.config.getProfile()
            .then(function (email) {
            _this.auth.getPhotoByEmail(email)
                .then(function (photo) {
                _this._photo = photo;
                _this._loadPhoto = false;
            }, function (err) {
                console.log("Error: " + JSON.stringify(err));
                _this._loadPhoto = false;
            });
        });
    };
    UtamaPage.prototype.histori = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__history_history__["a" /* HistoryPage */]);
    };
    UtamaPage.prototype.upload = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__upload_upload__["a" /* UploadPage */]);
    };
    UtamaPage.prototype.email = function () {
        var _this = this;
        var emailOpt = {
            to: '',
            subject: '',
            body: '',
            isHtml: true
        };
        this.mail.isAvailable()
            .then(function (available) {
            if (!available) {
                _this.common.presentAlert('Error', 'Email tidak tersedia. mohon install gmail di android anda...');
            }
        });
        this.mail.open(emailOpt);
    };
    UtamaPage.prototype.chat = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__chating_chating__["a" /* ChatingPage */]);
    };
    UtamaPage.prototype.setting = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__setting_setting__["a" /* SettingPage */]);
    };
    UtamaPage.prototype.logout = function () {
        this.auth.logout();
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
    };
    UtamaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-utama',template:/*ion-inline-start:"C:\Users\LENOVO YOGA\ProjectIonic\buset\src\pages\utama\utama.html"*/`<ion-header>\n	\n  <ion-navbar color="light" text-center>\n    <ion-title>\n      <img src="assets/imgs/pertamina-logo-shadow.png" alt="Logo">	   \n    </ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n<div class="container">\n  <img src="assets/imgs/bg.png" alt="Logo Pertamina">\n</div>\n  <div class="fab-conatainer">\n    <ion-fab class="fab" (click)="setting()">\n      <button ion-fab color="light">\n          <img src="{{_photo | showimage}}" alt="Photo Profile" *ngIf="!_loadPhoto">\n          <ion-spinner name="bubbles" style="width: 28px; height: 28px;" color="danger" *ngIf="_loadPhoto"></ion-spinner>\n      </button>\n    </ion-fab>\n  </div>\n  <div class="contacts-container">\n  <ion-list>\n    <button ion-item color="danger" (click)="histori();" class="item-borderless">\n      <ion-icon name="list-box" item-left></ion-icon>\n      <ion-label>Histori</ion-label>\n    </button>\n    <button ion-item color="danger" (click)="upload()" class="item-borderless">\n      <ion-icon name="attach" item-left></ion-icon>\n      <ion-label>Upload</ion-label>\n    </button>\n    <button ion-item color="danger" (click)="email()" class="item-borderless">\n      <ion-icon name="mail" item-left></ion-icon>\n      <ion-label>Email</ion-label>\n    </button>\n    <button ion-item color="danger" (click)="chat()" class="item-borderless">\n      <ion-icon name="chatbubbles" item-left></ion-icon>\n      <ion-label>Chating</ion-label>\n    </button>\n    <button ion-item color="danger" (click)="setting()" class="item-borderless">\n      <ion-icon name="cog" item-left></ion-icon>\n      <ion-label>Setting</ion-label>\n    </button>\n    <button ion-item color="danger" (click)="logout()" class="item-borderless">\n      <ion-icon name="log-out" item-left></ion-icon>\n      <ion-label>Keluar</ion-label>\n    </button>\n    </ion-list>\n</div>\n<div class="container-footer">\n  <img src="assets/imgs/pertamina-spbu.png" alt="Photo Logo Footer">\n</div>\n</ion-content>\n`/*ion-inline-end:"C:\Users\LENOVO YOGA\ProjectIonic\buset\src\pages\utama\utama.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_login_login__["a" /* LoginProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_config_config__["a" /* ConfigProvider */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_email_composer__["a" /* EmailComposer */],
            __WEBPACK_IMPORTED_MODULE_4__providers_common_common__["a" /* CommonProvider */]])
    ], UtamaPage);
    return UtamaPage;
}());

//# sourceMappingURL=utama.js.map

/***/ }),

/***/ 120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_config_config__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_common_common__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_login_login__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_setting_setting__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__ = __webpack_require__(56);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var SettingPage = (function () {
    function SettingPage(navCtrl, navParams, formBuilder, config, common, loginService, camera, setting) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.config = config;
        this.common = common;
        this.loginService = loginService;
        this.camera = camera;
        this.setting = setting;
        this.config.getProfile().then(function (res) {
            _this._confEmail = res;
        });
        this.FormProfile = this.formBuilder.group({
            Id: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            CreatedDate: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            UpdatedDate: [''],
            StatusLogin: [''],
            CustomerId: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            ApprovedBy: [''],
            NoCustomer: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            Email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(70), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            Password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(3), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(12)])],
            Level: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            ContactPerson: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            ContactPerson1: ['']
        });
        this._Id = this.FormProfile.controls['Id'];
        this._CreatedDate = this.FormProfile.controls['CreatedDate'];
        this._UpdatedDate = this.FormProfile.controls['UpdatedDate'];
        this._StatusLogin = this.FormProfile.controls['StatusLogin'];
        this._CustomerId = this.FormProfile.controls['CustomerId'];
        this._ApprovedBy = this.FormProfile.controls['ApprovedBy'];
        this._NoCustomer = this.FormProfile.controls['NoCustomer'];
        this._Email = this.FormProfile.controls['Email'];
        this._Password = this.FormProfile.controls['Password'];
        this._Level = this.FormProfile.controls['Level'];
        this._ContactPerson = this.FormProfile.controls['ContactPerson'];
        this._ContactPerson1 = this.FormProfile.controls['ContactPerson1'];
    }
    SettingPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.common.showLoading();
        setTimeout(function () {
            _this.common.stopLoading();
            _this.loadData();
        }, 3000);
    };
    SettingPage.prototype.loadData = function () {
        var _this = this;
        console.log(this._confEmail);
        this.common.showLoading();
        this.loginService.getProfile(this._confEmail) // get profile and save to storage local
            .then(function (res) {
            _this.Profile = {
                Id: res.id,
                CreatedDate: res.createdDate,
                UpdatedDate: res.updatedDate,
                StatusLogin: res.statusLogin,
                CustomerId: res.customerId,
                ApprovedBy: res.approvedBy,
                NoCustomer: res.noCustomer,
                Email: res.email,
                Password: res.password,
                Level: res.level,
                ContactPerson: res.contactPerson,
                ContactPerson1: res.contactPerson1
            };
            _this.FormProfile.setValue(_this.Profile);
            _this.PhotoDisplay = res.photo;
            _this.common.stopLoading();
        }).catch(function (err) {
            console.log(err);
            _this.common.stopLoading();
            _this.common.presentToast("Error : Cannot load data...");
        });
    };
    SettingPage.prototype.getPicture = function () {
        var _this = this;
        var options = {
            quality: 20,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(options).then(function (img) {
            _this.PhotoDisplay = 'data:image/png;base64,' + img;
        }, function (err) {
            console.log(err);
            _this.common.presentToast("Error: " + JSON.stringify(err));
        });
    };
    SettingPage.prototype.simpan = function () {
        var _this = this;
        this.common.showLoading();
        this.Profile = {
            Id: this.FormProfile.value.Id,
            Email: this.FormProfile.value.Email,
            Password: this.FormProfile.value.Password,
            Level: this.FormProfile.value.Level,
            CreatedDate: this.FormProfile.value.CreatedDate,
            UpdatedDate: new Date().toISOString(),
            StatusLogin: this.FormProfile.value.StatusLogin,
            CustomerId: this.FormProfile.value.CustomerId,
            ApprovedBy: this.FormProfile.value.ApprovedBy,
            ContactPerson: this.FormProfile.value.ContactPerson,
            ContactPerson1: this.FormProfile.value.ContactPerson1,
            NoCustomer: this.FormProfile.value.NoCustomer
        };
        this.setting.saveProfile(this.Profile, this.PhotoDisplay).then(function (res) {
            _this.common.presentAlert('Sukses', "Sukses menyimpan data...");
            _this.common.stopLoading();
        }, function (err) {
            console.log(err);
            _this.common.presentAlert('Error', 'Gagal menyimpan data');
            _this.common.stopLoading();
        });
    };
    SettingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-setting',template:/*ion-inline-start:"C:\Users\LENOVO YOGA\ProjectIonic\buset\src\pages\setting\setting.html"*/`<ion-header>\n\n  <ion-navbar>\n    <ion-title>BSO SETTING</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content no-padding>\n	<form [formGroup]="FormProfile">\n		<div class="container">	\n			<img src="{{PhotoDisplay}}">\n		</div>\n		<div class="fab-conatainer">\n			<ion-fab class="fab">\n				<button ion-fab (click)="getPicture()">\n					<ion-icon name="camera"></ion-icon>\n				</button>\n			</ion-fab>  \n		</div>\n		<ion-input type="hidden" formControlName="Id"></ion-input>\n		<ion-input type="hidden" formControlName="CreatedDate"></ion-input>\n		<ion-input type="hidden" formControlName="UpdatedDate"></ion-input>\n		<ion-input type="hidden" formControlName="StatusLogin"></ion-input>\n		<ion-input type="hidden" formControlName="CustomerId"></ion-input>\n		<ion-input type="hidden" formControlName="ApprovedBy"></ion-input>\n		<ion-input type="hidden" formControlName="NoCustomer"></ion-input>\n		<ion-list>\n			<ion-item>\n				<ion-label>Email</ion-label>\n				<ion-input type="email" formControlName="Email" autocomplete="off"  readonly></ion-input>\n			</ion-item>\n			<ion-item>\n				<ion-label>Password</ion-label>\n				<ion-input type="password" formControlName="Password" autocomplete="off"></ion-input>\n			</ion-item>\n			<ion-item>\n				<ion-label>Level</ion-label>\n				<ion-input type="text" formControlName="Level" autocomplete="off" readonly></ion-input>\n			</ion-item>\n			<ion-item>\n				<ion-label>Contact Person</ion-label>\n				<ion-input type="text" formControlName="ContactPerson"></ion-input>\n			</ion-item>\n			<ion-item>\n				<ion-label>Cotact Person 2</ion-label>\n				<ion-input type="text" formControlName="ContactPerson1"></ion-input>\n			</ion-item>\n			<ion-item>\n				<button ion-button small full type="submit" (click)="simpan()">Simpan</button>\n			</ion-item>\n		</ion-list>\n	</form>\n</ion-content>\n`/*ion-inline-end:"C:\Users\LENOVO YOGA\ProjectIonic\buset\src\pages\setting\setting.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_3__providers_config_config__["a" /* ConfigProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_common_common__["a" /* CommonProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_login_login__["a" /* LoginProvider */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_6__providers_setting_setting__["a" /* SettingProvider */]])
    ], SettingPage);
    return SettingPage;
}());

//# sourceMappingURL=setting.js.map

/***/ }),

/***/ 121:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UploadPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_common_common__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_config_config__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_login_login__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_upload_upload__ = __webpack_require__(192);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var UploadPage = (function () {
    function UploadPage(navCtrl, navParams, common, config, profile, formBuilder, camera, upload) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.common = common;
        this.config = config;
        this.profile = profile;
        this.formBuilder = formBuilder;
        this.camera = camera;
        this.upload = upload;
        this.config.getIdLogin().then(function (id) {
            _this._id = id;
        });
        this.config.getProfile().then(function (email) {
            _this._email = email;
        });
        this.FormBukti = this.formBuilder.group({
            JumlahSetor: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('[0-9]'), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            Sosa: [''],
            Keterangan: ['']
        });
        this.JumlahSetor = this.FormBukti.controls['JumlahSetor'].value;
        this.Sosa = this.FormBukti.controls['Sosa'].value;
        this.Keterangan = this.FormBukti.controls['Keterangan'].value;
    }
    UploadPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.common.showLoading();
        setTimeout(function () {
            _this.common.stopLoading();
            _this.getProfile();
        }, 3000);
    };
    UploadPage.prototype.getProfile = function () {
        var _this = this;
        this.common.showLoading();
        this.profile.getProfile(this._email)
            .then(function (res) {
            _this.User = res;
            console.log(res);
            _this.common.stopLoading();
        }, function (err) {
            console.log(err);
            _this.common.presentAlert('Error', 'Terjadi kegagalan saat mengambil data...');
            _this.common.stopLoading();
        });
    };
    UploadPage.prototype.simpan = function () {
        var _this = this;
        this.common.showLoading();
        if (!this.ImageSave) {
            this.common.presentAlert('Error', 'Silahkan ambil gambar bukti...');
            this.common.stopLoading();
        }
        else {
            var tgl = new Date();
            this.Bukti = {
                Vendor: this._email,
                TanggalSetor: tgl.toISOString(),
                JumlahSetor: this.FormBukti.controls['JumlahSetor'].value,
                Keterangan: this.FormBukti.controls['Keterangan'].value,
                Attachment: this.ImageSave,
                LoginId: parseInt(this._id),
                StatusBaca: 0,
                Sosa: this.FormBukti.controls['Sosa'].value,
                ApprovedByWho: "0"
            };
            console.log(this.Bukti);
            this.upload.save(this.Bukti).then(function (res) {
                _this.common.presentAlert('Sukses', 'Sukses menimpan data...');
                _this.common.stopLoading();
                var BuktiEmpty = {
                    JumlahSetor: "",
                    Keterangan: "",
                    Sosa: "",
                };
                _this.FormBukti.setValue(BuktiEmpty);
            }, function (err) {
                _this.common.presentAlert('Error', 'Gagal menyimpan data..');
                console.log(err);
                _this.common.stopLoading();
            });
        }
    };
    UploadPage.prototype.capture = function () {
        var _this = this;
        var camOptions = {
            quality: 20,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(camOptions)
            .then(function (img) {
            _this.ImageSave = 'data:image/png;base64,' + img;
        }, function (err) {
            console.log(err);
            _this.common.presentAlert('Error', 'Error while get picture...');
        });
    };
    UploadPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-upload',template:/*ion-inline-start:"C:\Users\LENOVO YOGA\ProjectIonic\buset\src\pages\upload\upload.html"*/`<ion-header>\n\n  <ion-navbar>\n    <ion-title>BSO UPLOAD</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content no-padding>\n	<div class="container" *ngIf="ImageSave" style="text-align: center;">\n		<img src="{{ImageSave}}" alt="Bukti" style="width: 30%;">\n	</div>\n	<div class="content-upload">\n		<form [formGroup]="FormBukti">\n			<ion-list>\n				<ion-item>\n					<button ion-button color="danger" full (click)="capture()">Pilih File</button>\n				</ion-item>\n				\n				<ion-item>\n					<ion-label floating>Jumlah Setor</ion-label>\n					<ion-input type="text" formControlName="JumlahSetor"></ion-input>\n				</ion-item>\n\n				<ion-item>\n					<ion-label floating>No. SO/SA</ion-label>\n					<ion-input type="text" formControlName="Sosa"></ion-input>\n				</ion-item>\n				\n				<ion-item>\n					<ion-label floating>Keterangan</ion-label>\n					<ion-input formControlName="Keterangan" style="height: 200px;"></ion-input>\n				</ion-item>\n				\n				<ion-item>\n					<button ion-button full color="danger" (click)="simpan()">Simpan</button>\n				</ion-item>\n			</ion-list>\n		</form>\n	</div>\n</ion-content>\n`/*ion-inline-end:"C:\Users\LENOVO YOGA\ProjectIonic\buset\src\pages\upload\upload.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__providers_common_common__["a" /* CommonProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_config_config__["a" /* ConfigProvider */],
            __WEBPACK_IMPORTED_MODULE_6__providers_login_login__["a" /* LoginProvider */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_7__providers_upload_upload__["a" /* UploadProvider */]])
    ], UploadPage);
    return UploadPage;
}());

//# sourceMappingURL=upload.js.map

/***/ }),

/***/ 131:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 131;

/***/ }),

/***/ 174:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/chating/chating.module": [
		355,
		7
	],
	"../pages/customer-search/customer-search.module": [
		356,
		6
	],
	"../pages/detail-bukti/detail-bukti.module": [
		357,
		5
	],
	"../pages/history/history.module": [
		358,
		4
	],
	"../pages/register/register.module": [
		359,
		3
	],
	"../pages/setting/setting.module": [
		360,
		2
	],
	"../pages/upload/upload.module": [
		361,
		1
	],
	"../pages/utama/utama.module": [
		362,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 174;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 18:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfigProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(175);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ConfigProvider = (function () {
    function ConfigProvider(storage) {
        this.storage = storage;
        this._url = 'http://www.mor2plg.id/buset/';
        this._contentType = 'application/x-www-form-urlencoded';
        this.storage.set('CONF_URL', this._url);
    }
    ConfigProvider.prototype.setCustId = function (custId) {
        this.storage.set('CONFIG_CUSTID', custId);
    };
    ConfigProvider.prototype.getCustId = function () {
        var _this = this;
        return this.storage.ready().then(function () { return _this.storage.get('CONFIG_CUSTID'); });
    };
    ConfigProvider.prototype.setLevel = function (level) {
        this.storage.set('CONF_LEVEL', level);
    };
    ConfigProvider.prototype.getLevel = function () {
        var _this = this;
        return this.storage.ready().then(function () { return _this.storage.get('CONF_LEVEL'); });
    };
    ConfigProvider.prototype.setToken = function (bearer, token) {
        this.storage.set('CONF_TOKEN', bearer + ' ' + token);
    };
    ConfigProvider.prototype.getToken = function () {
        var _this = this;
        return this.storage.ready().then(function () { return _this.storage.get('CONF_TOKEN'); });
    };
    ConfigProvider.prototype.setExpToken = function (expToken) {
        this.storage.set('CONF_EXPTOKEN', expToken);
    };
    ConfigProvider.prototype.getExpToken = function () {
        var _this = this;
        return this.storage.ready().then(function () { return _this.storage.get('CONF_EXPTOKEN'); });
    };
    ConfigProvider.prototype.setUrl = function (url) {
        if (url === void 0) { url = ''; }
        this.storage.set('CONF_URL', url);
    };
    ConfigProvider.prototype.getUrl = function () {
        var _this = this;
        return this.storage.ready().then(function () { return _this.storage.get('CONF_URL'); });
    };
    ConfigProvider.prototype.setLogin = function (loggedIn) {
        this.storage.set('CONF_LOGIN', loggedIn);
    };
    ConfigProvider.prototype.checkLogin = function () {
        var _this = this;
        return this.storage.ready().then(function () { return _this.storage.get('CONF_LOGIN'); });
    };
    ConfigProvider.prototype.setProfile = function (pict) {
        this.storage.set('CONF_PROFILE', pict);
    };
    ConfigProvider.prototype.getProfile = function () {
        var _this = this;
        return this.storage.ready().then(function () { return _this.storage.get('CONF_PROFILE'); });
    };
    ConfigProvider.prototype.setIdLogin = function (id) {
        this.storage.set('CONF_IDLOGIN', id);
    };
    ConfigProvider.prototype.getIdLogin = function () {
        var _this = this;
        return this.storage.ready().then(function () { return _this.storage.get('CONF_IDLOGIN'); });
    };
    ConfigProvider.prototype.encodedObject = function (Data) {
        return Object.keys(Data).map(function (key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(Data[key]);
        }).join('&');
    };
    ConfigProvider.prototype.delToken = function () {
        this.storage.remove('CONF_TOKEN');
    };
    ConfigProvider.prototype.delExpToken = function () {
        this.storage.remove('CONF_EXPTOKEN');
    };
    ConfigProvider.prototype.delLogedIn = function () {
        this.storage.remove('CONF_LOGIN');
    };
    ConfigProvider.prototype.delProfile = function () {
        this.storage.remove('CONF_PROFILE');
    };
    ConfigProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */]])
    ], ConfigProvider);
    return ConfigProvider;
}());

//# sourceMappingURL=config.js.map

/***/ }),

/***/ 190:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_config__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SettingProvider = (function () {
    function SettingProvider(http, config) {
        var _this = this;
        this.http = http;
        this.config = config;
        this.config.getToken().then(function (token) {
            _this._token = token;
        });
        this.config.getUrl().then(function (url) {
            _this._url = url;
        });
    }
    SettingProvider.prototype.saveProfile = function (Profile, DisplayPhoto) {
        var _this = this;
        if (DisplayPhoto != null) {
            Profile.Photo = DisplayPhoto;
        }
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this._token);
        return new Promise(function (resolve, reject) {
            _this.http.post(_this._url + 'api/Profile/' + Profile.Id, Profile, { headers: headers })
                .subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                reject(err);
            });
        });
    };
    SettingProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_2__config_config__["a" /* ConfigProvider */]])
    ], SettingProvider);
    return SettingProvider;
}());

//# sourceMappingURL=setting.js.map

/***/ }),

/***/ 192:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UploadProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_config__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UploadProvider = (function () {
    function UploadProvider(http, config) {
        var _this = this;
        this.http = http;
        this.config = config;
        this.config.getUrl().then(function (url) {
            _this._url = url;
        });
        this.config.getToken().then(function (token) {
            _this._token = token;
        });
    }
    UploadProvider.prototype.save = function (Bukti) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this._token);
        return new Promise(function (resolve, reject) {
            _this.http.post(_this._url + 'api/Bukti', Bukti, { headers: headers })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    UploadProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_2__config_config__["a" /* ConfigProvider */]])
    ], UploadProvider);
    return UploadProvider;
}());

//# sourceMappingURL=upload.js.map

/***/ }),

/***/ 21:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommonProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CommonProvider = (function () {
    function CommonProvider(toastCtrl, alertCtrl, loadingCtrl) {
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
    }
    // Loading
    CommonProvider.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            spinner: 'circles',
            content: 'Loading...'
        });
        this.loading.present();
    };
    CommonProvider.prototype.stopLoading = function () {
        this.loading.dismiss();
    };
    CommonProvider.prototype.showLoadingTimeOut = function (interval) {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            spinner: 'circles',
            content: 'Loading...'
        });
        this.loading.present();
        setTimeout(function () {
            _this.loading.dismiss();
        }, interval);
    };
    CommonProvider.prototype.presentAlert = function (title, subtitle) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: subtitle,
            buttons: ['OK']
        });
        alert.present();
    };
    CommonProvider.prototype.presentToast = function (message, duration) {
        if (duration === void 0) { duration = 5000; }
        var toast = this.toastCtrl.create({
            message: message,
            duration: duration,
            showCloseButton: true,
            closeButtonText: 'Tutup'
        });
        toast.present();
    };
    CommonProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]])
    ], CommonProvider);
    return CommonProvider;
}());

//# sourceMappingURL=common.js.map

/***/ }),

/***/ 235:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmojiProvider; });
var EmojiProvider = (function () {
    function EmojiProvider() {
    }
    EmojiProvider.prototype.getEmojis = function () {
        var EMOJIS = "😀 😃 😄 😁 😆 😅 😂 🤣 ☺️ 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 🤡 🤠 😏 😒 😞 😔 😟 😕 🙁" +
            " ☹️ 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 🤤 😭 😓 😪 😴 🙄 🤔 🤥 😬 🤐 🤢 🤧 😷 🤒 🤕 😈 👿" +
            " 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 🤝 👍 👎 👊 ✊ 🤛 🤜 🤞 ✌️ 🤘 👌 👈 👉 👆 👇 ☝️ ✋ 🤚" +
            " 🖐 🖖 👋 🤙 💪 🖕 ✍️ 🤳 💅 🖖 💄 💋 👄 👅 👂 👃 👣 👁 👀 🗣 👤 👥 👶 👦 👧 👨 👩 👱‍♀️ 👱 👴 👵 👲 👳‍♀️ 👳 👮‍♀️ 👮 👷‍♀️ 👷" +
            " 💂‍♀️ 💂 🕵️‍♀️ 🕵️ 👩‍⚕️ 👨‍⚕️ 👩‍🌾 👨‍🌾 👩‍🍳 👨‍🍳 👩‍🎓 👨‍🎓 👩‍🎤 👨‍🎤 👩‍🏫 👨‍🏫 👩‍🏭 👨‍🏭 👩‍💻 👨‍💻 👩‍💼 👨‍💼 👩‍🔧 👨‍🔧 👩‍🔬 👨‍🔬" +
            " 👩‍🎨 👨‍🎨 👩‍🚒 👨‍🚒 👩‍✈️ 👨‍✈️ 👩‍🚀 👨‍🚀 👩‍⚖️ 👨‍⚖️ 🤶 🎅 👸 🤴 👰 🤵 👼 🤰 🙇‍♀️ 🙇 💁 💁‍♂️ 🙅 🙅‍♂️ 🙆 🙆‍♂️ 🙋 🙋‍♂️ 🤦‍♀️ 🤦‍♂️ 🤷‍♀" +
            "️ 🤷‍♂️ 🙎 🙎‍♂️ 🙍 🙍‍♂️ 💇 💇‍♂️ 💆 💆‍♂️ 🕴 💃 🕺 👯 👯‍♂️ 🚶‍♀️ 🚶 🏃‍♀️ 🏃 👫 👭 👬 💑 👩‍❤️‍👩 👨‍❤️‍👨 💏 👩‍❤️‍💋‍👩 👨‍❤️‍💋‍👨 👪 👨‍👩‍👧" +
            " 👨‍👩‍👧‍👦 👨‍👩‍👦‍👦 👨‍👩‍👧‍👧 👩‍👩‍👦 👩‍👩‍👧 👩‍👩‍👧‍👦 👩‍👩‍👦‍👦 👩‍👩‍👧‍👧 👨‍👨‍👦 👨‍👨‍👧 👨‍👨‍👧‍👦 👨‍👨‍👦‍👦 👨‍👨‍👧‍👧 👩‍👦 👩‍👧" +
            " 👩‍👧‍👦 👩‍👦‍👦 👩‍👧‍👧 👨‍👦 👨‍👧 👨‍👧‍👦 👨‍👦‍👦 👨‍👧‍👧 👚 👕 👖 👔 👗 👙 👘 👠 👡 👢 👞 👟 👒 🎩 🎓 👑 ⛑ 🎒 👝 👛 👜 💼 👓" +
            " 🕶 🌂 ☂️";
        var EmojiArr = EMOJIS.split(' ');
        var groupNum = Math.ceil(EmojiArr.length / (24));
        var items = [];
        for (var i = 0; i < groupNum; i++) {
            items.push(EmojiArr.slice(i * 24, (i + 1) * 24));
        }
        return items;
    };
    return EmojiProvider;
}());

//# sourceMappingURL=emoji.js.map

/***/ }),

/***/ 236:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PipesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__showimage_showimage__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__customdate_customdate__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__relative_time_relative_time__ = __webpack_require__(324);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var PipesModule = (function () {
    function PipesModule() {
    }
    PipesModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__showimage_showimage__["a" /* ShowimagePipe */],
                __WEBPACK_IMPORTED_MODULE_2__customdate_customdate__["a" /* CustomdatePipe */],
                __WEBPACK_IMPORTED_MODULE_3__relative_time_relative_time__["a" /* RelativeTimePipe */]],
            imports: [],
            exports: [__WEBPACK_IMPORTED_MODULE_1__showimage_showimage__["a" /* ShowimagePipe */],
                __WEBPACK_IMPORTED_MODULE_2__customdate_customdate__["a" /* CustomdatePipe */],
                __WEBPACK_IMPORTED_MODULE_3__relative_time_relative_time__["a" /* RelativeTimePipe */]]
        })
    ], PipesModule);
    return PipesModule;
}());

//# sourceMappingURL=pipes.module.js.map

/***/ }),

/***/ 237:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(256);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 256:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_email_composer__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_home__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_register_register__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_utama_utama__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_http__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pipes_pipes_module__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_components_module__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_config_config__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_common_common__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__models_bukti__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__models_user__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__models_customer__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__models_login__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_login_login__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_setting_setting__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__providers_history_history__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__providers_upload_upload__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__providers_emoji_emoji__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ionic_storage__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_customer_search_customer_search__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_history_history__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_upload_upload__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_chating_chating__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_setting_setting__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_detail_bukti_detail_bukti__ = __webpack_require__(116);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
































var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_utama_utama__["a" /* UtamaPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_history_history__["a" /* HistoryPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_upload_upload__["a" /* UploadPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_chating_chating__["a" /* ChatingPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_setting_setting__["a" /* SettingPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_detail_bukti_detail_bukti__["a" /* DetailBuktiPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_customer_search_customer_search__["a" /* CustomerSearchPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_11__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_12__pipes_pipes_module__["a" /* PipesModule */],
                __WEBPACK_IMPORTED_MODULE_13__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/chating/chating.module#ChatingPageModule', name: 'ChatingPage', segment: 'chating', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/customer-search/customer-search.module#CustomerSearchPageModule', name: 'CustomerSearchPage', segment: 'customer-search', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/detail-bukti/detail-bukti.module#DetailBuktiPageModule', name: 'DetailBuktiPage', segment: 'detail-bukti', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/history/history.module#HistoryPageModule', name: 'HistoryPage', segment: 'history', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/register/register.module#RegisterPageModule', name: 'RegisterPage', segment: 'register', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/setting/setting.module#SettingPageModule', name: 'SettingPage', segment: 'setting', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/upload/upload.module#UploadPageModule', name: 'UploadPage', segment: 'upload', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/utama/utama.module#UtamaPageModule', name: 'UtamaPage', segment: 'utama', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_25__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_utama_utama__["a" /* UtamaPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_history_history__["a" /* HistoryPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_upload_upload__["a" /* UploadPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_chating_chating__["a" /* ChatingPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_setting_setting__["a" /* SettingPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_detail_bukti_detail_bukti__["a" /* DetailBuktiPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_customer_search_customer_search__["a" /* CustomerSearchPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_14__providers_config_config__["a" /* ConfigProvider */],
                __WEBPACK_IMPORTED_MODULE_15__providers_common_common__["a" /* CommonProvider */],
                __WEBPACK_IMPORTED_MODULE_16__models_bukti__["a" /* BuktiModel */],
                __WEBPACK_IMPORTED_MODULE_17__models_user__["a" /* UserModel */],
                __WEBPACK_IMPORTED_MODULE_18__models_customer__["a" /* CustomerModel */],
                __WEBPACK_IMPORTED_MODULE_19__models_login__["a" /* LoginModel */],
                __WEBPACK_IMPORTED_MODULE_20__providers_login_login__["a" /* LoginProvider */],
                __WEBPACK_IMPORTED_MODULE_21__providers_setting_setting__["a" /* SettingProvider */],
                __WEBPACK_IMPORTED_MODULE_22__providers_history_history__["a" /* HistoryProvider */],
                __WEBPACK_IMPORTED_MODULE_23__providers_upload_upload__["a" /* UploadProvider */],
                __WEBPACK_IMPORTED_MODULE_24__providers_emoji_emoji__["a" /* EmojiProvider */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_email_composer__["a" /* EmailComposer */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 29:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_scan__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_scan___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_scan__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_delay__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_delay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_delay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_retryWhen__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_retryWhen___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_retryWhen__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_retry__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_retry___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_retry__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_finally__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_finally___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_finally__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_delayWhen__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_delayWhen___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_delayWhen__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_timeout__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_observable_throw__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_rxjs_add_observable_throw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_add_observable_onErrorResumeNext__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_add_observable_onErrorResumeNext___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_rxjs_add_observable_onErrorResumeNext__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_rxjs_add_operator_toPromise__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_rxjs_add_operator_catch__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__config_config__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
















var LoginProvider = (function () {
    function LoginProvider(http, config) {
        var _this = this;
        this.http = http;
        this.config = config;
        this.config.getUrl().then(function (url) {
            _this._url = url;
        });
        this.config.getToken().then(function (token) {
            _this._token = token;
        });
    }
    LoginProvider.prototype.authLogin = function (User) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]();
            headers.append('Content-Type', _this.config._contentType);
            headers.append('Access-Control-Allow-Origin', '*');
            _this.http.post(_this._url + 'token', _this.config.encodedObject(User), { headers: headers })
                .retry(3)
                .subscribe(function (data) {
                resolve(data.json());
            }, function (err) {
                reject(err);
            });
        });
    };
    LoginProvider.prototype.getProfile = function (Email) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', this.config._contentType);
        headers.append('Authorization', this._token);
        headers.append('Access-Control-Allow-Origin', '*');
        return new Promise(function (resolve, reject) {
            _this.http.get(_this._url + 'api/Profile?Email=' + Email, { headers: headers })
                .subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                reject(err);
            });
        });
    };
    LoginProvider.prototype.getIdLogin = function (Email) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', this.config._contentType);
        headers.append('Authorization', this._token);
        headers.append('Access-Control-Allow-Origin', '*');
        return new Promise(function (resolve, reject) {
            _this.http.get(_this._url + 'api/getIdLogin?Email=' + Email, { headers: headers })
                .subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                reject(err);
            });
        });
    };
    LoginProvider.prototype.getPhotoByEmail = function (Email) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', this.config._contentType);
        headers.append('Authorization', this._token);
        headers.append('Access-Control-Allow-Origin', '*');
        return new Promise(function (resolve, reject) {
            _this.http.get(_this._url + 'api/getPhoto?Email=' + Email, { headers: headers })
                .subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                reject(err);
            });
        });
    };
    LoginProvider.prototype.searchCustomer = function (Nama) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]();
            headers.append('Content-Type', _this.config._contentType);
            headers.append('Access-Control-Allow-Origin', '*');
            _this.http.get(_this._url + 'api/Customer?Nama=' + Nama, { headers: headers })
                .subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                reject(err);
            });
        });
    };
    LoginProvider.prototype.daftarUserBaru = function (User) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]();
            headers.append('Content-Type', _this.config._contentType);
            headers.append('Access-Control-Allow-Origin', '*');
            _this.http.post(_this._url + 'api/Coba', _this.config.encodedObject(User), { headers: headers })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    LoginProvider.prototype.logout = function () {
        this.config.delToken();
        this.config.delProfile();
        this.config.delLogedIn();
        this.config.delExpToken();
        this.config.setLogin(false);
    };
    LoginProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_15__config_config__["a" /* ConfigProvider */]])
    ], LoginProvider);
    return LoginProvider;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 322:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShowimagePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ShowimagePipe = (function () {
    function ShowimagePipe() {
    }
    ShowimagePipe.prototype.transform = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (value == '' || value == undefined || typeof value == undefined)
            return 'assets/imgs/profile-default.png';
        else {
            if (value.indexOf("data:image/png;base64,") != -1 || value.indexOf("data:image/jpeg;base64,") != -1)
                return value;
            else
                return 'data:image/png;base64,' + value;
        }
    };
    ShowimagePipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'showimage',
        })
    ], ShowimagePipe);
    return ShowimagePipe;
}());

//# sourceMappingURL=showimage.js.map

/***/ }),

/***/ 323:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomdatePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var CustomdatePipe = (function () {
    function CustomdatePipe() {
    }
    CustomdatePipe.prototype.transform = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return value.getDate() + '/' + value.getMonth() + '/' + value.getFullYear();
    };
    CustomdatePipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'customdate',
        })
    ], CustomdatePipe);
    return CustomdatePipe;
}());

//# sourceMappingURL=customdate.js.map

/***/ }),

/***/ 324:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RelativeTimePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
 * Generated class for the RelativeTimePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var RelativeTimePipe = (function () {
    function RelativeTimePipe() {
    }
    /**
     * Takes a value and makes it lowercase.
     */
    RelativeTimePipe.prototype.transform = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return new Date(value);
    };
    RelativeTimePipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'relativeTime',
        })
    ], RelativeTimePipe);
    return RelativeTimePipe;
}());

//# sourceMappingURL=relative-time.js.map

/***/ }),

/***/ 348:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(55);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\LENOVO YOGA\ProjectIonic\buset\src\app\app.html"*/`<ion-nav [root]="rootPage"></ion-nav>\n`/*ion-inline-end:"C:\Users\LENOVO YOGA\ProjectIonic\buset\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 349:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__emoji_picker_emoji_picker__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ComponentsModule = (function () {
    function ComponentsModule() {
    }
    ComponentsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__emoji_picker_emoji_picker__["a" /* EmojiPickerComponent */]],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_1__emoji_picker_emoji_picker__["a" /* EmojiPickerComponent */]),
            ],
            exports: [__WEBPACK_IMPORTED_MODULE_1__emoji_picker_emoji_picker__["a" /* EmojiPickerComponent */]]
        })
    ], ComponentsModule);
    return ComponentsModule;
}());

//# sourceMappingURL=components.module.js.map

/***/ }),

/***/ 350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export EMOJI_PICKER_VALUE_ACCESSOR */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmojiPickerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_emoji_emoji__ = __webpack_require__(235);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EMOJI_PICKER_VALUE_ACCESSOR = {
    provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* NG_VALUE_ACCESSOR */],
    useExisting: Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* forwardRef */])(function () { return EmojiPickerComponent; }),
    multi: true
};
var EmojiPickerComponent = (function () {
    function EmojiPickerComponent(emojiProvider) {
        this.emojiArr = [];
        this.emojiArr = emojiProvider.getEmojis();
    }
    EmojiPickerComponent.prototype.writeValue = function (obj) {
        this._content = obj;
    };
    EmojiPickerComponent.prototype.registerOnChange = function (fn) {
        this._onChanged = fn;
        this.setValue(this._content);
    };
    EmojiPickerComponent.prototype.registerOnTouched = function (fn) {
        this._onTouched = fn;
    };
    EmojiPickerComponent.prototype.setValue = function (val) {
        this._content += val;
        if (this._content) {
            this._onChanged(this._content);
        }
    };
    EmojiPickerComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'emoji-picker',
            providers: [EMOJI_PICKER_VALUE_ACCESSOR],template:/*ion-inline-start:"C:\Users\LENOVO YOGA\ProjectIonic\buset\src\components\emoji-picker\emoji-picker.html"*/`<!-- Generated template for the EmojiPickerComponent component -->\n<div class="emoji-picker">\n    <div class="emoji-items">\n      <ion-slides pager>\n  \n        <ion-slide *ngFor="let items of emojiArr">\n          <span class="emoji-item"\n                (click)="setValue(item)"\n                *ngFor="let item of items">\n            {{item}}\n          </span>\n        </ion-slide>\n  \n      </ion-slides>\n    </div>\n  </div>\n  `/*ion-inline-end:"C:\Users\LENOVO YOGA\ProjectIonic\buset\src\components\emoji-picker\emoji-picker.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_emoji_emoji__["a" /* EmojiProvider */]])
    ], EmojiPickerComponent);
    return EmojiPickerComponent;
}());

//# sourceMappingURL=emoji-picker.js.map

/***/ }),

/***/ 351:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BuktiModel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var BuktiModel = (function () {
    function BuktiModel() {
    }
    BuktiModel = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], BuktiModel);
    return BuktiModel;
}());

//# sourceMappingURL=bukti.js.map

/***/ }),

/***/ 352:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserModel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var UserModel = (function () {
    function UserModel() {
    }
    UserModel = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], UserModel);
    return UserModel;
}());

//# sourceMappingURL=user.js.map

/***/ }),

/***/ 353:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomerModel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CustomerModel = (function () {
    function CustomerModel() {
    }
    CustomerModel = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], CustomerModel);
    return CustomerModel;
}());

//# sourceMappingURL=customer.js.map

/***/ }),

/***/ 354:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginModel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LoginModel = (function () {
    function LoginModel() {
        this.grant_type = 'password';
    }
    LoginModel = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], LoginModel);
    return LoginModel;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_config_config__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_common_common__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_login_login__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utama_utama__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__register_register__ = __webpack_require__(118);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var HomePage = (function () {
    function HomePage(navCtrl, navParams, alertCtrl, config, formsBuilder, common, loginService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.config = config;
        this.formsBuilder = formsBuilder;
        this.common = common;
        this.loginService = loginService;
        // get Url
        this.config.getUrl().then(function (url) {
            _this._url = url;
        });
        this.FormLogin = this.formsBuilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(70), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(30), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])]
        });
        this.email = this.FormLogin.controls['email'];
        this.password = this.FormLogin.controls['password'];
    }
    // Login Action
    HomePage.prototype.login = function () {
        var _this = this;
        this.common.showLoading();
        if (!this.FormLogin.valid) {
            this.common.presentAlert('Konfirmasi', 'Form Login Required');
            this.common.stopLoading();
        }
        else {
            this.User = {
                UserName: this.FormLogin.value.email,
                Password: this.FormLogin.value.password,
                grant_type: 'password'
            };
            this.common.presentToast('Authentication...');
            this.loginService.authLogin(this.User).then(function (result) {
                _this.config.setLogin(true);
                _this.config.setToken(result.token_type, result.access_token); //save token to localstorage
                _this.config.setExpToken(result.expires_in); // save expired token
                _this.config.setProfile(result.UserName);
                _this.common.presentToast('Load Profile..');
                _this.loginService.getProfile(result.UserName) // set level to local storage
                    .then(function (prof) {
                    _this.config.setLevel(prof.level); // set level
                    _this.common.presentToast('Load Level..');
                    _this.loginService.getIdLogin(result.UserName) //set id to local storage
                        .then(function (resId) {
                        _this.common.presentToast('Redirect to Home Page..');
                        _this.config.setIdLogin(resId);
                        _this.common.stopLoading();
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__utama_utama__["a" /* UtamaPage */]);
                    }, function (err) {
                        _this.common.stopLoading();
                        console.log(err);
                        //this.common.presentToast(JSON.stringify(err));
                    });
                }, function (err) {
                    _this.common.stopLoading();
                    console.log(err);
                });
            }).catch(function (err) {
                _this.common.stopLoading();
                _this.common.presentToast("Email atau Password anda salah. silahlan coba lagi..");
            });
        }
    };
    // Set Hostname Action
    HomePage.prototype.setHostname = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Set Hostname',
            inputs: [
                {
                    name: 'hostname',
                    placeholder: this._url
                }
            ],
            buttons: [
                {
                    text: 'Batal',
                    handler: function (data) {
                        console.log('Terminate!');
                    }
                },
                {
                    text: 'Simpan',
                    handler: function (data) {
                        var fHost = data.hostname;
                        if (fHost.length > 0) {
                            _this.config.setUrl(fHost);
                            _this._url = fHost;
                        }
                        else {
                            _this.config.setUrl(_this._url);
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    HomePage.prototype.setRegister = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__register_register__["a" /* RegisterPage */]);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\LENOVO YOGA\ProjectIonic\buset\src\pages\home\home.html"*/`<ion-header>\n	<ion-navbar color="light" text-center>\n		<ion-title>\n			<img src="assets/imgs/pertamina-logo-shadow.png" alt="Logo" class="title-image">\n		</ion-title>\n	</ion-navbar>\n</ion-header>\n\n\n<ion-content no-padding>\n	<div>\n		<div class="logo-row" text-center>\n			<img src="assets/icon/logo-login-pertamina.png" class="logo-login">\n		</div>\n		<ion-grid style="margin-top: 0px;">\n			<div>\n					<form  novalidate="true" [formGroup]="FormLogin">\n						<ion-list>\n						<ion-item>\n							<ion-label floating>Email</ion-label>\n							<ion-input type="email" autocomplete="off" formControlName="email" [class.invalid]="!FormLogin.controls.email.valid && (FormLogin.controls.email.dirty)"></ion-input>\n						</ion-item>\n						<ion-item *ngIf="!FormLogin.controls.email.valid  && (FormLogin.controls.email.dirty)">\n						<p><small style="font-size: 10px;color: red;"><i>*Please enter a valid email.</i></small></p>\n						</ion-item>\n						<ion-item>\n							<ion-label floating>Password</ion-label>\n								<ion-input formControlName="password" type="password" [class.invalid]="!FormLogin.controls.password.valid && (FormLogin.controls.password.dirty || submitAttempt)"></ion-input>\n							</ion-item>\n							<ion-item *ngIf="!FormLogin.controls.password.valid  && (FormLogin.controls.password.dirty)">\n						<p><small style="font-size: 10px;color: red;"><i>*Please enter a valid password, min 6 characters</i></small></p>\n						</ion-item>\n					</ion-list>\n					<div padding>\n						<button ion-button block (click)="login()" [disabled]="!FormLogin.valid" color="danger">Login</button>\n					</div>\n					</form>\n					<div class="host-button">\n						<button ion-button clear color="danger" (click)="setRegister()">Daftar</button>\n					</div>\n					\n				</div>\n		</ion-grid>\n	</div>\n</ion-content>\n`/*ion-inline-end:"C:\Users\LENOVO YOGA\ProjectIonic\buset\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_config_config__["a" /* ConfigProvider */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_4__providers_common_common__["a" /* CommonProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_login_login__["a" /* LoginProvider */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HistoryProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_scan__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_scan___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_scan__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_delay__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_delay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_delay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_retryWhen__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_retryWhen___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_retryWhen__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_finally__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_finally___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_finally__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_delayWhen__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_delayWhen___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_delayWhen__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_timeout__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_observable_throw__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_rxjs_add_observable_throw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_observable_onErrorResumeNext__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_observable_onErrorResumeNext___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_rxjs_add_observable_onErrorResumeNext__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_add_operator_toPromise__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__config_config__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var HistoryProvider = (function () {
    function HistoryProvider(http, config) {
        var _this = this;
        this.http = http;
        this.config = config;
        config.getUrl().then(function (url) {
            _this._url = url;
        });
        config.getToken().then(function (token) {
            _this._token = token;
        });
        config.getIdLogin().then(function (idLogin) {
            _this._idLogin = idLogin;
        });
    }
    HistoryProvider.prototype.getHistoryByLogin = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', this.config._contentType);
        headers.append('Authorization', this._token);
        return new Promise(function (resolve, reject) {
            _this.http.get(_this._url + 'api/History/' + _this._idLogin, { headers: headers })
                .subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                reject(err);
            });
        });
    };
    HistoryProvider.prototype.getDetailBukti = function (id) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', this.config._contentType);
        headers.append('Authorization', this._token);
        return new Promise(function (resolve, reject) {
            _this.http.get(_this._url + 'api/DetailHistory/' + id, { headers: headers })
                .subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                reject(err);
            });
        });
    };
    HistoryProvider.prototype.getByCustomer = function (id) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', this.config._contentType);
        headers.append('Authorization', this._token);
        return new Promise(function (resolve, reject) {
            _this.http.get(_this._url + 'api/HistoryCustomer/' + id, { headers: headers })
                .subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                reject(err);
            });
        });
    };
    HistoryProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_13__config_config__["a" /* ConfigProvider */]])
    ], HistoryProvider);
    return HistoryProvider;
}());

//# sourceMappingURL=history.js.map

/***/ })

},[237]);
//# sourceMappingURL=main.js.map