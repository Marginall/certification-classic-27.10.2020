import $ from 'js#/lib/jquery';

export const filter = () => {
	const $filterForm = $('#filter');
	const $controls = $(document).find('input, select');
	const currentPage = $filterForm.data('page');

	const data = {
		params: {
			brand: [],
			manufacturer: '',
			model: '',
			year: '',
			price: []
		},
		pagination: {
			sort: '',
			perPage: '',
			page: ''
		}
	};

	const createGetParams = (data) => {
		const url = new URL(window.location.href);
		let tempData = {};

		if (data.params && data.pagination) {
			tempData = Object.assign(tempData, data.params, data.pagination);
			console.log(tempData.year);

			url.searchParams.set('page', tempData.page);

			if (tempData.year !== '') {
				url.searchParams.set('year', tempData.year);
			}

			url.searchParams.set('price', tempData.price[0] + ',' + tempData.price[1]);

			if (tempData.model !== '') {
				url.searchParams.set('model', tempData.model);
			}

			if (tempData.manufacturer !== '') {
				url.searchParams.set('manufacturer', tempData.manufacturer);
			}

			if (tempData.brand !== '') {
				url.searchParams.set('brand', tempData.brand);
			}

			url.searchParams.set('sort', tempData.sort);
			url.searchParams.set('per-page', tempData.perPage);
		}

		window.history.pushState(null, null, url.href);
	};

	$controls.on('change', () => {
		const brands = [];

		$controls.each((i, el) => {
			const $el = $(el);
			const brand = $el.prop('checked') ? $el.parent().find('span').text() : null;
			const manufacturer =
				$el.attr('name') === 'marka' ? $el.find('option:selected').text() : null;
			const model =
				$el.attr('name') === 'model' ? $el.find('option:selected').text() : null;
			const year = $el.attr('name') === 'year' ? parseInt($el.val()) : null;
			const minPrice = parseInt($('#price-from').val());
			const maxPrice = parseInt($('#price-to').val());
			const sort =
				$el.attr('name') === 'sort' ? $el.find('option:selected').text() : null;
			const perPage =
				$el.attr('name') === 'per_page'
					? $el.find('option:selected').text()
					: null;

			if (brand) {
				brands.push(brand);
				data.params.brand = brands;
			}

			if (manufacturer && !isNaN($el.val())) {
				data.params.manufacturer = manufacturer;
			}

			if (model && !isNaN($el.val())) {
				data.params.model = model;
			}

			if (year) {
				data.params.year = year;
			}

			if (minPrice && maxPrice) {
				data.params.price = [];
				data.params.price.push(minPrice, maxPrice);
			}

			if (sort) {
				data.pagination.sort = sort;
			}

			if (perPage) {
				data.pagination.perPage = perPage;
			}

			if (currentPage !== '') {
				data.pagination.page = currentPage;
			}
		});

		createGetParams(data);
		console.log(data);
	});
};
