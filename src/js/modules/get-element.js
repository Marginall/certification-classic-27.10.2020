
export const getElement = (data) => {
	let $list = $('[data-list]');
	const fragment = document.createDocumentFragment();
	const template = $('#card')[0].content;
	console.log('start');

	$list.html('');
	$(data).each((i, good) => {
		const element = template.cloneNode(true);
		const $element = $(element);
		let card = $element.find('.card');
		let img = $element.find('.card__image');
		let brand = $element.find('.card__brand');
		let manufacturer = $element.find('.card__manufacturer');
		let year = $element.find('.card__year');
		let model = $element.find('.card__model');
		let price = $element.find('.card__price');

		card.attr('id', good.id)
		img.attr('src', good.image.sizes['card-preview']);
		img.attr('alt', good.image.alt);
		brand.attr('id', good.brand.id)
		brand.text(good.brand.name);
		manufacturer.attr('id', good.manufacturer.id);
		manufacturer.text(good.manufacturer.name);
		year.text(good.year + ' ' + 'год');
		model.attr('id', good.model.id);
		model.text(good.model.name);
		price.attr('id', good.price.currency.id);
		price.text(good.price.currency.symbol + '' + good.price.value);

		fragment.appendChild($element[0]);
		$list.append(fragment);
	});
};
