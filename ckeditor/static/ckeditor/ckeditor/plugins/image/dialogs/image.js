﻿/*
Copyright (c) 2003-2011, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

(function () {
    var a = function (b, c) {
            var d = 1,
                e = 2,
                f = 4,
                g = 8,
                h = /^\s*(\d+)((px)|\%)?\s*$/i,
                i = /(^\s*(\d+)((px)|\%)?\s*$)|^$/i,
                j = /^\d+px$/,
                k = function () {
                    var C = this.getValue(),
                        D = this.getDialog(),
                        E = C.match(h);
                    if (E) {
                        if (E[2] == '%') p(D, false);
                        C = E[1];
                    }
                    if (D.lockRatio) {
                        var F = D.originalElement;
                        if (F.getCustomData('isReady') == 'true') if (this.id == 'txtHeight') {
                            if (C && C != '0') C = Math.round(F.$.width * (C / F.$.height));
                            if (!isNaN(C)) D.setValueOf('info', 'txtWidth', C);
                        } else {
                            if (C && C != '0') C = Math.round(F.$.height * (C / F.$.width));
                            if (!isNaN(C)) D.setValueOf('info', 'txtHeight', C);
                        }
                    }
                    l(D);
                },
                l = function (C) {
                    if (!C.originalElement || !C.preview) return 1;
                    C.commitContent(f, C.preview);
                    return 0;
                };

            function m() {
                var C = arguments,
                    D = this.getContentElement('advanced', 'txtdlgGenStyle');
                D && D.commit.apply(D, C);
                this.foreach(function (E) {
                    if (E.commit && E.id != 'txtdlgGenStyle') E.commit.apply(E, C);
                });
            };
            var n;

            function o(C) {
                if (n) return;
                n = 1;
                var D = this.getDialog(),
                    E = D.imageElement;
                if (E) {
                    this.commit(d, E);
                    C = [].concat(C);
                    var F = C.length,
                        G;
                    for (var H = 0; H < F; H++) {
                        G = D.getContentElement.apply(D, C[H].split(':'));
                        G && G.setup(d, E);
                    }
                }
                n = 0;
            };
            var p = function (C, D) {
                    var E = C.originalElement;
                    if (!E) return null;
                    if (D == 'check') {
                        if (!C.userlockRatio && E.getCustomData('isReady') == 'true') {
                            var F = C.getValueOf('info', 'txtWidth'),
                                G = C.getValueOf('info', 'txtHeight'),
                                H = E.$.width * 1000 / E.$.height,
                                I = F * 1000 / G;
                            C.lockRatio = false;
                            if (!F && !G) C.lockRatio = true;
                            else if (!isNaN(H) && !isNaN(I)) if (Math.round(H) == Math.round(I)) C.lockRatio = true;
                        }
                    } else if (D != undefined) C.lockRatio = D;
                    else {
                        C.userlockRatio = 1;
                        C.lockRatio = !C.lockRatio;
                    }
                    var J = CKEDITOR.document.getById(w);
                    if (C.lockRatio) J.removeClass('cke_btn_unlocked');
                    else J.addClass('cke_btn_unlocked');
                    var K = C._.editor.lang.image,
                        L = K[C.lockRatio ? 'unlockRatio' : 'lockRatio'];
                    J.setAttribute('title', L);
                    J.getFirst().setText(L);
                    return C.lockRatio;
                },
                q = function (C) {
                    var D = C.originalElement;
                    if (D.getCustomData('isReady') == 'true') {
                        C.setValueOf('info', 'txtWidth', D.$.width);
                        C.setValueOf('info', 'txtHeight', D.$.height);
                    }
                    l(C);
                },
                r = function (C, D) {
                    if (C != d) return;

                    function E(J, K) {
                        var L = J.match(h);
                        if (L) {
                            if (L[2] == '%') {
                                L[1] += '%';
                                p(F, false);
                            }
                            return L[1];
                        }
                        return K;
                    };
                    var F = this.getDialog(),
                        G = '',
                        H = this.id == 'txtWidth' ? 'width' : 'height',
                        I = D.getAttribute(H);
                    if (I) G = E(I, G);
                    G = E(D.getStyle(H), G);
                    this.setValue(G);
                },
                s, t = function () {
                    var C = this.originalElement;
                    C.setCustomData('isReady', 'true');
                    C.removeListener('load', t);
                    C.removeListener('error', u);
                    C.removeListener('abort', u);
                    CKEDITOR.document.getById(y).setStyle('display', 'none');
                    if (!this.dontResetSize) q(this);
                    if (this.firstLoad) CKEDITOR.tools.setTimeout(function () {
                        p(this, 'check');
                    }, 0, this);
                    this.firstLoad = false;
                    this.dontResetSize = false;
                },
                u = function () {
                    var E = this;
                    var C = E.originalElement;
                    C.removeListener('load', t);
                    C.removeListener('error', u);
                    C.removeListener('abort', u);
                    var D = CKEDITOR.getUrl(b.skinPath + 'images/noimage.png');
                    if (E.preview) E.preview.setAttribute('src', D);
                    CKEDITOR.document.getById(y).setStyle('display', 'none');
                    p(E, false);
                },
                v = function (C) {
                    return CKEDITOR.tools.getNextId() + '_' + C;
                },
                w = v('btnLockSizes'),
                x = v('btnResetSize'),
                y = v('ImagePreviewLoader'),
                z = v('ImagePreviewBox'),
                A = v('previewLink'),
                B = v('previewImage');
            return {
                title: b.lang.image[c == 'image' ? 'title' : 'titleButton'],
                minWidth: 420,
                minHeight: 360,
                onShow: function () {
                    var I = this;
                    I.imageElement = false;
                    I.linkElement = false;
                    I.imageEditMode = false;
                    I.linkEditMode = false;
                    I.lockRatio = true;
                    I.userlockRatio = 0;
                    I.dontResetSize = false;
                    I.firstLoad = true;
                    I.addLink = false;
                    var C = I.getParentEditor(),
                        D = I.getParentEditor().getSelection(),
                        E = D.getSelectedElement(),
                        F = E && E.getAscendant('a');
                    CKEDITOR.document.getById(y).setStyle('display', 'none');
                    s = new CKEDITOR.dom.element('img', C.document);
                    I.preview = CKEDITOR.document.getById(B);
                    I.originalElement = C.document.createElement('img');
                    I.originalElement.setAttribute('alt', '');
                    I.originalElement.setCustomData('isReady', 'false');
                    if (F) {
                        I.linkElement = F;
                        I.linkEditMode = true;
                        var G = F.getChildren();
                        if (G.count() == 1) {
                            var H = G.getItem(0).getName();
                            if (H == 'img' || H == 'input') {
                                I.imageElement = G.getItem(0);
                                if (I.imageElement.getName() == 'img') I.imageEditMode = 'img';
                                else if (I.imageElement.getName() == 'input') I.imageEditMode = 'input';
                            }
                        }
                        if (c == 'image') I.setupContent(e, F);
                    }
                    if (E && E.getName() == 'img' && !E.data('cke-realelement') || E && E.getName() == 'input' && E.getAttribute('type') == 'image') {
                        I.imageEditMode = E.getName();
                        I.imageElement = E;
                    }
                    if (I.imageEditMode) {
                        I.cleanImageElement = I.imageElement;
                        I.imageElement = I.cleanImageElement.clone(true, true);
                        I.setupContent(d, I.imageElement);
                    } else I.imageElement = C.document.createElement('img');
                    p(I, true);
                    if (!CKEDITOR.tools.trim(I.getValueOf('info', 'txtUrl'))) {
                        I.preview.removeAttribute('src');
                        I.preview.setStyle('display', 'none');
                    }
                },
                onOk: function () {
                    var D = this;
                    if (D.imageEditMode) {
                        var C = D.imageEditMode;
                        if (c == 'image' && C == 'input' && confirm(b.lang.image.button2Img)) {
                            C = 'img';
                            D.imageElement = b.document.createElement('img');
                            D.imageElement.setAttribute('alt', '');
                            b.insertElement(D.imageElement);
                        } else if (c != 'image' && C == 'img' && confirm(b.lang.image.img2Button)) {
                            C = 'input';
                            D.imageElement = b.document.createElement('input');
                            D.imageElement.setAttributes({
                                type: 'image',
                                alt: ''
                            });
                            b.insertElement(D.imageElement);
                        } else {
                            D.imageElement = D.cleanImageElement;
                            delete D.cleanImageElement;
                        }
                    } else {
                        if (c == 'image') D.imageElement = b.document.createElement('img');
                        else {
                            D.imageElement = b.document.createElement('input');
                            D.imageElement.setAttribute('type', 'image');
                        }
                        D.imageElement.setAttribute('alt', '');
                    }
                    if (!D.linkEditMode) D.linkElement = b.document.createElement('a');
                    D.commitContent(d, D.imageElement);
                    D.commitContent(e, D.linkElement);
                    if (!D.imageElement.getAttribute('style')) D.imageElement.removeAttribute('style');
                    if (!D.imageEditMode) {
                        if (D.addLink) {
                            if (!D.linkEditMode) {
                                b.insertElement(D.linkElement);
                                D.linkElement.append(D.imageElement, false);
                            } else b.insertElement(D.imageElement);
                        } else b.insertElement(D.imageElement);
                    } else if (!D.linkEditMode && D.addLink) {
                        b.insertElement(D.linkElement);
                        D.imageElement.appendTo(D.linkElement);
                    } else if (D.linkEditMode && !D.addLink) {
                        b.getSelection().selectElement(D.linkElement);
                        b.insertElement(D.imageElement);
                    }
                },
                onLoad: function () {
                    var D = this;
                    if (c != 'image') D.hidePage('Link');
                    var C = D._.element.getDocument();
                    D.addFocusable(C.getById(x), 5);
                    D.addFocusable(C.getById(w), 5);
                    D.commitContent = m;
                },
                onHide: function () {
                    var C = this;
                    if (C.preview) C.commitContent(g, C.preview);
                    if (C.originalElement) {
                        C.originalElement.removeListener('load', t);
                        C.originalElement.removeListener('error', u);
                        C.originalElement.removeListener('abort', u);
                        C.originalElement.remove();
                        C.originalElement = false;
                    }
                    delete C.imageElement;
                },
                contents: [{
                    id: 'info',
                    label: b.lang.image.infoTab,
                    accessKey: 'I',
                    elements: [{
                        type: 'vbox',
                        padding: 0,
                        children: [{
                            id: 'txtUrl',
                            type: 'text',
                            label: 'URL',
                            className: 'image_url',
                            required: true,
                            update: function (){
                                console.log('updating');
                            },
                            onChange: function () {
                                var C = this.getDialog(),
                                    D = this.getValue();
                                if (D.length > 0) {
                                    C = this.getDialog();
                                    var E = C.originalElement;
                                    C.preview.removeStyle('display');
                                    E.setCustomData('isReady', 'false');
                                    var F = CKEDITOR.document.getById(y);
                                    if (F) F.setStyle('display', '');
                                    E.on('load', t, C);
                                    E.on('error', u, C);
                                    E.on('abort', u, C);
                                    E.setAttribute('src', D);
                                    s.setAttribute('src', D);
                                    C.preview.setAttribute('src', s.$.src);
                                    l(C);
                                } else if (C.preview) {
                                    C.preview.removeAttribute('src');
                                    C.preview.setStyle('display', 'none');
                                }
                            },
                            onLoad : function( data )
                            {
                                activate_image_select(this);
                            },
                            setup: function (C, D) {
                                if (C == d) {
                                    var E = D.data('cke-saved-src') || D.getAttribute('src'),
                                        F = this;
                                    this.getDialog().dontResetSize = true;
                                    F.setValue(E);
                                    F.setInitValue();
                                }
                                //console.log(window.dismissRelatedLookupPopup);
                            },
                            commit: function (C, D) {
                                var E = this;
                                if (C == d && (E.getValue() || E.isChanged())) {
                                    D.data('cke-saved-src', E.getValue());
                                    D.setAttribute('src', E.getValue());
                                } else if (C == g) {
                                    D.setAttribute('src', '');
                                    D.removeAttribute('src');
                                }
                            },
                            validate: CKEDITOR.dialog.validate.notEmpty(b.lang.image.urlMissing)
                        
                        }]
                    },
                    {
                        id: 'txtAlt',
                        type: 'text',
                        label: b.lang.image.alt,
                        accessKey: 'T',
                        'default': '',
                        onChange: function () {
                            l(this.getDialog());
                        },
                        setup: function (C, D) {
                            if (C == d) this.setValue(D.getAttribute('alt'));
                        },
                        commit: function (C, D) {
                            var E = this;
                            if (C == d) {
                                if (E.getValue() || E.isChanged()) D.setAttribute('alt', E.getValue());
                            } else if (C == f) D.setAttribute('alt', E.getValue());
                            else if (C == g) D.removeAttribute('alt');
                        }
                    }, {
                        type: 'hbox',
                        children: [{
                            type: 'vbox',
                            children: [{
                                type: 'hbox',
                                widths: ['50%', '50%'],
                                children: [{
                                    type: 'vbox',
                                    padding: 1,
                                    children: [{
                                        type: 'text',
                                        width: '40px',
                                        id: 'txtWidth',
                                        label: b.lang.common.width,
                                        onKeyUp: k,
                                        onChange: function () {
                                            o.call(this, 'advanced:txtdlgGenStyle');
                                        },
                                        validate: function () {
                                            var C = this.getValue().match(i),
                                                D = !! (C && parseInt(C[1], 10) !== 0);
                                            if (!D) alert(b.lang.common.invalidWidth);
                                            return D;
                                        },
                                        setup: r,
                                        commit: function (C, D, E) {
                                            var F = this.getValue();
                                            if (C == d) {
                                                if (F) D.setStyle('width', CKEDITOR.tools.cssLength(F));
                                                else D.removeStyle('width');
                                                !E && D.removeAttribute('width');
                                            } else if (C == f) {
                                                var G = F.match(h);
                                                if (!G) {
                                                    var H = this.getDialog().originalElement;
                                                    if (H.getCustomData('isReady') == 'true') D.setStyle('width', H.$.width + 'px');
                                                } else D.setStyle('width', CKEDITOR.tools.cssLength(F));
                                            } else if (C == g) {
                                                D.removeAttribute('width');
                                                D.removeStyle('width');
                                            }
                                        }
                                    }, {
                                        type: 'text',
                                        id: 'txtHeight',
                                        width: '40px',
                                        label: b.lang.common.height,
                                        onKeyUp: k,
                                        onChange: function () {
                                            o.call(this, 'advanced:txtdlgGenStyle');
                                        },
                                        validate: function () {
                                            var C = this.getValue().match(i),
                                                D = !! (C && parseInt(C[1], 10) !== 0);
                                            if (!D) alert(b.lang.common.invalidHeight);
                                            return D;
                                        },
                                        setup: r,
                                        commit: function (C, D, E) {
                                            var F = this.getValue();
                                            if (C == d) {
                                                if (F) D.setStyle('height', CKEDITOR.tools.cssLength(F));
                                                else D.removeStyle('height');
                                                !E && D.removeAttribute('height');
                                            } else if (C == f) {
                                                var G = F.match(h);
                                                if (!G) {
                                                    var H = this.getDialog().originalElement;
                                                    if (H.getCustomData('isReady') == 'true') D.setStyle('height', H.$.height + 'px');
                                                } else D.setStyle('height', CKEDITOR.tools.cssLength(F));
                                            } else if (C == g) {
                                                D.removeAttribute('height');
                                                D.removeStyle('height');
                                            }
                                        }
                                    }]
                                }, {
                                    type: 'html',
                                    style: 'margin-top:30px;width:40px;height:40px;',
                                    onLoad: function () {
                                        var C = CKEDITOR.document.getById(x),
                                            D = CKEDITOR.document.getById(w);
                                        if (C) {
                                            C.on('click', function (E) {
                                                q(this);
                                                E.data && E.data.preventDefault();
                                            }, this.getDialog());
                                            C.on('mouseover', function () {
                                                this.addClass('cke_btn_over');
                                            }, C);
                                            C.on('mouseout', function () {
                                                this.removeClass('cke_btn_over');
                                            }, C);
                                        }
                                        if (D) {
                                            D.on('click', function (E) {
                                                var J = this;
                                                var F = p(J),
                                                    G = J.originalElement,
                                                    H = J.getValueOf('info', 'txtWidth');
                                                if (G.getCustomData('isReady') == 'true' && H) {
                                                    var I = G.$.height / G.$.width * H;
                                                    if (!isNaN(I)) {
                                                        J.setValueOf('info', 'txtHeight', Math.round(I));
                                                        l(J);
                                                    }
                                                }
                                                E.data.preventDefault();
                                            }, this.getDialog());
                                            D.on('mouseover', function () {
                                                this.addClass('cke_btn_over');
                                            }, D);
                                            D.on('mouseout', function () {
                                                this.removeClass('cke_btn_over');
                                            }, D);
                                        }
                                    },
                                    html: '<div><a href="javascript:void(0)" tabindex="-1" title="' + b.lang.image.unlockRatio + '" class="cke_btn_locked" id="' + w + '" role="button"><span class="cke_label">' + b.lang.image.unlockRatio + '</span></a>' + '<a href="javascript:void(0)" tabindex="-1" title="' + b.lang.image.resetSize + '" class="cke_btn_reset" id="' + x + '" role="button"><span class="cke_label">' + b.lang.image.resetSize + '</span></a>' + '</div>'
                                }]
                            }, {
                                type: 'vbox',
                                padding: 1,
                                children: [{
                                    id: 'cmbAlign',
                                    type: 'select',
                                    widths: ['35%', '65%'],
                                    style: 'width:90px',
                                    label: b.lang.common.align,
                                    'default': '',
                                    items: [
                                        [b.lang.common.notSet, ''],
                                        [b.lang.common.alignLeft, 'left'],
                                        [b.lang.common.alignRight, 'right']
                                    ],
                                    onChange: function () {
                                        l(this.getDialog());
                                        o.call(this, 'advanced:txtdlgGenStyle');
                                    },
                                    setup: function (C, D) {
                                        if (C == d) {
                                            var E = D.getStyle('float');
                                            switch (E) {
                                            case 'inherit':
                                            case 'none':
                                                E = '';
                                            }!E && (E = (D.getAttribute('align') || '').toLowerCase());
                                            this.setValue(E);
                                        }
                                    },
                                    commit: function (C, D, E) {
                                        var F = this.getValue();
                                        if (C == d || C == f) {
                                            if (F) D.setStyle('float', F);
                                            else D.removeStyle('float');
                                            if (!E && C == d) {
                                                F = (D.getAttribute('align') || '').toLowerCase();
                                                switch (F) {
                                                case 'left':
                                                case 'right':
                                                    D.removeAttribute('align');
                                                }
                                            }
                                        } else if (C == g) D.removeStyle('float');
                                    }
                                }]
                            }]
                        }, {
                            type: 'vbox',
                            height: '250px',
                            children: [{
                                type: 'html',
                                style: 'width:95%;',
                                html: '<div>' + CKEDITOR.tools.htmlEncode(b.lang.common.preview) + '<br>' + '<div id="' + y + '" class="ImagePreviewLoader" style="display:none"><div class="loading">&nbsp;</div></div>' + '<div id="' + z + '" class="ImagePreviewBox"><table><tr><td>' + '<a href="javascript:void(0)" target="_blank" onclick="return false;" id="' + A + '">' + '<img id="' + B + '" alt="" /></a>' + (b.config.image_previewText || 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas feugiat consequat diam. Maecenas metus. Vivamus diam purus, cursus a, commodo non, facilisis vitae, nulla. Aenean dictum lacinia tortor. Nunc iaculis, nibh non iaculis aliquam, orci felis euismod neque, sed ornare massa mauris sed velit. Nulla pretium mi et risus. Fusce mi pede, tempor id, cursus ac, ullamcorper nec, enim. Sed tortor. Curabitur molestie. Duis velit augue, condimentum at, ultrices a, luctus ut, orci. Donec pellentesque egestas eros. Integer cursus, augue in cursus faucibus, eros pede bibendum sem, in tempus tellus justo quis ligula. Etiam eget tortor. Vestibulum rutrum, est ut placerat elementum, lectus nisl aliquam velit, tempor aliquam eros nunc nonummy metus. In eros metus, gravida a, gravida sed, lobortis id, turpis. Ut ultrices, ipsum at venenatis fringilla, sem nulla lacinia tellus, eget aliquet turpis mauris non enim. Nam turpis. Suspendisse lacinia. Curabitur ac tortor ut ipsum egestas elementum. Nunc imperdiet gravida mauris.') + '</td></tr></table></div></div>'
                            }]
                        }]
                    }]
                }]
            };
        };
    CKEDITOR.dialog.add('image', function (b) {
        return a(b, 'image');
    });
    CKEDITOR.dialog.add('imagebutton', function (b) {
        return a(b, 'imagebutton');
    });
})();
