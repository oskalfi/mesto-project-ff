(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",n)}function t(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n)}function n(e){"Escape"===e.key&&t(document.querySelector(".popup_is-opened"))}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=Array(t);n<t;n++)o[n]=e[n];return o}var r={baseUrl:"https://nomoreparties.co/v1/wff-cohort-19",headers:{authorization:"bd73c30f-b229-43da-9111-af67cbae75e9"}};function c(e,t,n,o,c,a,u,i,l){var s=e.querySelector(".card").cloneNode(!0),d=s.querySelector(".card__image");d.src=t.link,d.alt=t.name;var f=s.querySelector(".card__like-button-likes");f.textContent=l.length,s.querySelector(".card__title").textContent=t.name;var p=s.querySelector(".card__delete-button");a===u?p.addEventListener("click",(function(e){(function(e){fetch("".concat(r.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:{authorization:"bd73c30f-b229-43da-9111-af67cbae75e9"}})})(i),o(e)})):p.remove();var m=s.querySelector(".card__like-button");return m.addEventListener("click",(function(e){c(e,i,f)})),l.forEach((function(e){e._id===u&&m.classList.add("card__like-button_is-active")})),d.addEventListener("click",n),s}function a(e){e.target.closest(".card").remove()}function u(e,t,n){e.target.className.includes("is-active")?(console.log("Вы сняли лайк!"),function(e,t){fetch("".concat(r.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:{authorization:"bd73c30f-b229-43da-9111-af67cbae75e9"}}).then((function(e){if(e.ok)return e.json();Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){t.textContent=e.likes.length})).catch((function(e){console.log(e)}))}(t,n),e.target.classList.toggle("card__like-button_is-active")):(console.log("Вы поставили лайк!"),function(e,t){fetch("".concat(r.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:{authorization:"bd73c30f-b229-43da-9111-af67cbae75e9"}}).then((function(e){if(e.ok)return e.json();Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){t.textContent=e.likes.length})).catch((function(e){console.log(e)}))}(t,n),e.target.classList.toggle("card__like-button_is-active"))}function i(e,t){t.classList.remove("popup__input-type-error"),e.querySelector(".".concat(t.id,"-error")).textContent=""}function l(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove("popup__button_inactive")):(t.disabled=!0,t.classList.add("popup__button_inactive"))}function s(e){Array.from(e.querySelectorAll(".popup__input")).forEach((function(t){i(e,t)}))}var d=document.querySelector("#card-template").content,f=document.querySelector(".places__list"),p=document.querySelector(".popup_type_edit"),m=document.querySelector(".popup_type_new-card"),v=document.querySelector(".popup_type_image"),y=document.querySelector(".popup_type_avatar");document.querySelectorAll(".popup").forEach((function(e){!function(e){e.querySelector(".popup__close").addEventListener("click",(function(){t(e)})),e.addEventListener("mousedown",(function(n){n.target===n.currentTarget&&t(e)}))}(e),e.classList.add("popup_is-animated")}));var _=document.forms["new-place"],h=_.elements["place-name"],b=_.elements.link;_.addEventListener("submit",(function(e){e.preventDefault();var n={name:h.value,link:b.value};!function(e,t,n,o,c,a,u,i,l){fetch("".concat(r.baseUrl,"/cards"),{method:"POST",headers:{authorization:"bd73c30f-b229-43da-9111-af67cbae75e9","Content-Type":"application/json"},body:JSON.stringify({name:e,link:t})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){console.log("New card:"),console.log(e);var t=i(n,o,c,a,u,e.owner._id,r.profileId,e._id,e.likes);l.prepend(t)})).catch((function(e){console.log(e)}))}(h.value,b.value,d,n,P,a,u,c,f),h.value="",b.value="",t(m)}));var g=document.querySelector(".profile__title"),S=document.querySelector(".profile__description"),k=document.querySelector(".profile__image"),q=document.forms["edit-profile"],C=q.elements.name,E=q.elements.description,L=q.querySelector(".button");q.addEventListener("submit",(function(e){var n,o,c;e.preventDefault(),L.textContent="Сохранение...",g.textContent=C.value,S.textContent=E.value,n=g.textContent,o=S.textContent,c=L,fetch("".concat(r.baseUrl,"/users/me"),{method:"PATCH",headers:{authorization:"bd73c30f-b229-43da-9111-af67cbae75e9","Content-Type":"application/json"},body:JSON.stringify({name:n,about:o})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){console.log("New profile info"),console.log(e),c.textContent="Сохранить"})).catch((function(e){console.log(e),c.textContent="Сохранить"})),t(p)})),document.querySelector(".profile__edit-button").addEventListener("click",(function(){e(p),s(document.forms["edit-profile"]),C.value=g.textContent,E.value=S.textContent})),document.querySelector(".profile__add-button").addEventListener("click",(function(){e(m),h.value="",b.value="",s(document.forms["new-place"])}));var x,j,A,w=document.querySelector(".profile__image"),F=document.forms["edit-avatar"],D=y.querySelector("#avatar-input");function P(t){e(v);var n=v.querySelector(".popup__image");n.src=t.target.src,n.alt=t.target.alt,v.querySelector(".popup__caption").textContent=n.alt}F.addEventListener("submit",(function(e){var n,o;e.preventDefault(),n=D.value,o=w,fetch("".concat(r.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:{authorization:"bd73c30f-b229-43da-9111-af67cbae75e9","Content-Type":"application/json"},body:JSON.stringify({avatar:n})}).then((function(e){if(e.ok)return e.json();Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){o.style="background-image: url(".concat(e.avatar,")")})).catch((function(e){console.log(e)})),t(y)})),w.addEventListener("click",(function(){e(y),D.value="",s(F)})),Array.from(document.querySelectorAll(".popup__form")).forEach((function(e){!function(e){var t=Array.from(e.querySelectorAll(".popup__input")),n=e.querySelector(".popup__button");l(t,n),t.forEach((function(o){o.addEventListener("input",(function(){!function(e,t){/(?:(?![\t-\r \x2Da-z\xA0\u017F\u0430-\u044F\u0451\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u212A\u3000\uD800-\uDFFF\uFEFF])[\s\S]|[\uD800-\uDBFF][\uDC00-\uDFFF])/i.test(t.value)&&"url"!==t.type?t.setCustomValidity(t.dataset.errorMessage):/^\s+/.test(t.value)?t.setCustomValidity("Пробел в начале строки"):t.setCustomValidity(""),t.validity.valid?i(e,t):function(e,t,n){t.classList.add("popup__input-type-error"),e.querySelector(".".concat(t.id,"-error")).textContent=n}(e,t,t.validationMessage)}(e,o),l(t,n)}))}))}(e)})),x=g,j=S,A=k,fetch("".concat(r.baseUrl,"/users/me"),r).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){x.textContent=e.name,j.textContent=e.about,A.style="background-image: url(".concat(e.avatar,")"),r.profileId=e._id})).catch((function(e){console.log(e)})),function(e,t,n,c,a,u){fetch("".concat(r.baseUrl,"/cards"),r).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(i){var l,s=function(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return o(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,c=function(){};return{s:c,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:c}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,u=!0,i=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return u=e.done,e},e:function(e){i=!0,a=e},f:function(){try{u||null==n.return||n.return()}finally{if(i)throw a}}}}(i);try{for(s.s();!(l=s.n()).done;){var d=l.value;t.append(e(n,d,c,a,u,d.owner._id,r.profileId,d._id,d.likes))}}catch(e){s.e(e)}finally{s.f()}})).catch((function(e){console.log(e)}))}(c,f,d,P,a,u)})();