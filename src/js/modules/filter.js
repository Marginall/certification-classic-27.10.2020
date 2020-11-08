import $ from 'js#/lib/jquery';
import goodsData from 'js#/data/goods';
import {getElement} from './get-element';
import {sort} from './sort';
import {createGetParams} from './create-get-params';

export const filter = () => {
	const $filterForm = $('#filter');
	const $controls = $(document).find('input, select');
	const currentPage = $filterForm.data('page');

	getElement(goodsData);

	const filterProducts = (params, goodsData) => {
		let tempData = {};
		let newGoodsData = goodsData;
		let filterParams = Object.entries(Object.assign(tempData, params.params, params.pagination));

		const list = newGoodsData.filter((item) => {
			let result = true;

			filterParams.forEach((param) => {
				if (param[1].length || typeof param[1] === 'number') {
					if (param[0] === 'manufacturer' && !param[1].includes(item.manufacturer.name)) {
						result = result && false;
					}

					if (param[0] === 'model' && !param[1].includes(item.model.name)) {
						result = result && false;
					}

					if (param[0] === 'year') {
						param[1] = param[1] + '';
						if (!param[1].includes(item.year)) {
							result = result && false;
						}
					}

					if (param[0] === 'brand') {
						if (!param[1].includes(item.brand.name)) {
							result = result && false;
						}
					}

					if (param[0] === 'price') {
						if (item.price.value < parseFloat(param[1][0]) || item.price.value > parseFloat(param[1][1])) {
							console.log(1);
							result = result && false;
						}
					}

					if (param[0] === 'sort') {
						
					}

				} else {
					return false;
				}
			});

			return result;
		});

		sort(list);
		getElement(list);
	};

	$controls.on('change', () => {
		const brands = [];
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
				page: currentPage
			}
	};

		$controls.each((i, el) => {
			const $el = $(el);
			let val = $el.val();
			let brand, manufacturer, model, year, minPrice, maxPrice, sort, perPage;

			switch ($el.attr('name')) {
				case 'marka':
					manufacturer = $el.find('option:selected').text();
					if (manufacturer && !isNaN(val)) {
						data.params.manufacturer = manufacturer;
					}
					break;
				case 'model':
					model = $el.find('option:selected').text();
					if (model && !isNaN(val)) {
						data.params.model = model;
					}
					break;
				case 'year':
					year = parseInt($el.val());
					if (year && !isNaN(val)) {
						data.params.year = year;
					}
					break;
				case 'price-from':
					minPrice = parseInt($el.val());
					data.params.price.push(minPrice);
					break;
				case 'price-to':
					maxPrice = parseInt($el.val());
					data.params.price.push(maxPrice);
					break;
				case 'sort':
					sort = $el.find('option:selected').text();
					data.pagination.sort = sort;
					break;
				case 'per_page':
					perPage = $el.find('option:selected').text();
					data.pagination.perPage = perPage;
					break;
				case 'brand':
					if ($el.prop('checked')) {
						brand = $el.parent().find('span').text();
						brands.push(brand);
					}
					data.params.brand = brands;
					break;
				default:
			}
		});

		console.log(data);
		createGetParams(data);
		filterProducts(data, goodsData);
	});
};
