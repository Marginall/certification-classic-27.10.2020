export const sort = (list) => {
	let value = $('#sort').val();

	list.sort(function (firstElement, secondElement) {
		if (value === '1') {
			if (firstElement.price.value > secondElement.price.value) {
				return 1;
			} else {
				return -1;
			}
		} else if (value === '2') {
			if (firstElement.price.value > secondElement.price.value) {
				return -1;
			} else {
				return 1;
			}
		} else if (value === '3') {
			if (firstElement.year > secondElement.year) {
				return 1;
			} else {
				return -1;
			}
		} else if (value === '4') {
			if (firstElement.year > secondElement.year) {
				return -1;
			} else {
				return 1;
			}
		}
	});

	return list;
};
