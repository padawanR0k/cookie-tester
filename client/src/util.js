const listEl = document.querySelector('.cookieList');

const getCookies = () => {
	if (document.cookie) {
		const cookies = document.cookie.split(';').map(item => {
			item = item.replace(/^\s+|\s+$/g, '');
			const [key, value] = item.split('=');
			return { key, value }
		});
		return cookies;
	} else {
		return [];
	}
}
const deleteCookie =  (name) => {
	document.cookie = `${name}=; expires=Thu, 01 Jan 1999 00:00:10 GMT;`;
}

const renderCookieList = () => {
	const list = getCookies();
	console.log(list);
	const html = list.reduce((acc, curr) => {
		const str = `<li>
			${curr.key}: ${curr.value}
			<button id="${curr.key}" type="button" class="button">삭제</button>
		</li>`
		acc += str;
		return acc;
	}, '')
	console.log(html);
	listEl.innerHTML = `<ul>${html}</ul>`;
}


document.addEventListener('readystatechange', (e) => {
	if (e.target.readyState === 'complete') {
		renderCookieList()
		listEl.addEventListener('click', (e) => {
			const { id, tagName } = e.target;
			console.log(tagName);
			if (tagName === 'BUTTON') {
				deleteCookie(id);
				renderCookieList()
			}
		})
	}
})

export {
	renderCookieList
}