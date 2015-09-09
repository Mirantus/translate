var app = {
	id: 0,
	prevId: 0,
	list: window.list,
	state: 'question', // or 'answer' or 'finish',
	translate: 'en-ru',

	init: function () {
		$("#know").click($.proxy(this.onKnow ,this));
		$('#answer').click($.proxy(this.onAnswer ,this));
		$('#next').click($.proxy(this.onNext ,this));
		$('#start').click($.proxy(this.onStart ,this));
		$('#backButton').click($.proxy(this.onBack,this));
		$('#switch').click($.proxy(this.onSwitch,this));

		this.refresh();
	},

	refresh: function () {
		var lang, text;

		$('#know, #answer, #next-li, #next, #start').hide();

		if (this.state == 'question') {
			$('#answer').show();
		}

		if (this.state == 'answer') {
			$('#know, #next, #next-li').show();
		}

		if (this.state == 'finish') {
			text = 'Вопросов больше нет';
			$('#start').show();
		} else {
			if (this.state == 'question') {
				lang = this.translate == 'en-ru' ? 'en' : 'ru';
			} else {
				lang = this.translate == 'en-ru' ? 'ru' : 'en';
			}

			text = this.list[this.id][lang];

			if (lang == 'en') {
				text += '<br>' + this.list[this.id]['trans'];
			}
		}

		$('#text').html(text);
		$('h1').html(this.countUnknown() + ' / ' + this.list.length);
	},

	countUnknown: function () {
		var result = 0;

		$.each(this.list, function (i, item) {
			if (!item.know) {
				result++;
			}
		});

		return result;
	},

	start: function () {
		$.each(this.list, function (i, item) {
			item.know = 0;
		});

		this.prevId = this.id;
		this.id = 0;
		this.state = 'question';
	},

	next: function () {
		this.id++;

		if (!this.list[this.id]) {
			var foundRepeat = false;

			$.each(this.list, $.proxy(function (i, item) {
				if (!item.know) {
					foundRepeat = true;
					this.id = i;
					return false;
				}
				return true;
			}, this));

			if (!foundRepeat) {
				this.finish();
				this.refresh();
				return;
			}
		}

		if (this.list[this.id].know) {
			this.next();
			return;
		}
		this.state = 'question';
	},

	back: function () {
		this.id = this.prevId;
		this.list[this.id].know = 0;
		this.state = 'question';
	},

	finish: function () {
		this.state = 'finish';
	},

	switchLanguage: function () {
		this.translate = this.translate == 'en-ru' ? 'ru-en' : 'en-ru';
	},

	onStart: function (e) {
		e.preventDefault();
		this.start();
		this.refresh();
	},

	onKnow: function (e) {
		e.preventDefault();
		this.list[this.id].know = 1;
		this.prevId = this.id;
		this.next();
		this.refresh();
	},

	onAnswer: function (e) {
		e.preventDefault();
		this.state = 'answer';
		this.refresh();
	},

	onNext: function (e) {
		e.preventDefault();
		this.prevId = this.id;
		this.next();
		this.refresh();
	},

	onBack: function (e) {
		e.preventDefault();
		this.back();
		this.refresh();
	},

	onSwitch: function (e) {
		e.preventDefault();
		this.switchLanguage();
		this.refresh();
	}
};

$(function() {
	app.init();
});
