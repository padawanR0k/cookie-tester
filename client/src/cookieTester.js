import { renderCookieList } from './util.js';
const resultEl = document.querySelector('.response');

const getValues = (elements) => {
	const data = Array.from(elements).reduce((acc, curr) => {
		if (curr.id) {
			acc[curr.id] = curr.value;
		}
		return acc;
	}, {})
	return data;
}

const getCookie = (cookieName) => {
	const cookies = document.cookie.split(';').map(item => {
		item = item.replace(/^\s+|\s+$/g, '');
		const [key, value] = item.split('=');
		return { key, value }
	});
	console.log(cookies);
	const cookie = cookies.find(item => {
		return item.key === cookieName;
	})
	return cookie;
}

const printResult = (cookieName, response) => {
	const cookie = getCookie(cookieName);
	const { options } = response.data;
	const list = Object.keys(options).reduce((acc, curr) => {
		const str = `<li>
		${curr}: ${options[curr]}
		</li>`
		acc += str;
		return acc;
	}, '');
	console.log({ cookie, cookieName, list });
	resultEl.innerHTML = `<div class="card" style="width: 300px;">
			<div class="card-divider">
				Response
			</div>
			<div class="card-section">
				<p>
					<ul>
						<li>
							${cookie?.key || ''} 발급여부
							<ul>
								<li>
								${cookie ? '성공' : '실패'}
								</li>
							</ul>
						</li>
					</ul>

					<ul>
						<li>
							cookie에 지정한 옵션
							<ul>
								${list}
							</ul>
						</li>
					</ul>

				</p>
				<p>
					개발자도구 - Application - Cookies를 확인해보세요
				</p>
			</div>
		</div>`;
}

const addEvent = () => {
	document.querySelector('#form').addEventListener('submit', (e) => {
		console.log(e);
		e.preventDefault();
		const values = {};

		const URL = document.querySelector("#URL").value;
		values.key = document.querySelector("#key").value;
		values.value = document.querySelector("#value").value;
		values.expires = document.querySelector("#expires").value;
		values.maxAge = document.querySelector("#maxAge").value;
		values.domain = document.querySelector("#domain").value;
		values.path = document.querySelector("#path").value;
		values.secure = document.querySelector("#secure").checked;
		values.httpOnly = document.querySelector("#httpOnly").checked;
		values.sameSite = document.querySelector("[name='sameSite']:checked").value;

		axios.post(URL, values, { withCredentials: true })
			.then(res => {
				console.log(res);
				printResult(values.key, res)
				renderCookieList()
			})
			.catch(err => {
				console.error(err);
			})
	})
};


document.addEventListener('readystatechange', (e) => {
	if (e.target.readyState === 'complete') {
		addEvent()
	}
})

export {
	getCookie
}