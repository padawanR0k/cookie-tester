import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(cookieParser())
app.use(express.json())
app.use(cors({
	origin: ['http://127.0.0.1:5500', 'http://localhost:5500', 'https://checkintest.42cadet.kr'],
	credentials: true
}))

app.get('/', (req, res) => {
	res.status(200).json({ status: true });
})

app.post('/getCookie', (req, res) => {
	console.log(req.query)
	const { key, value, expires, maxAge, domain, path, secure, httpOnly, sameSite } = req.body;
	const cookieName = key;
	const cookieValue = value;
	const options = {};
	if (expires) {
		options.expires = expires;
	}
	if (maxAge) {
		options.maxAge = maxAge;
	}
	if (domain) {
		options.domain = domain;
	}
	if (path) {
		options.path = path;
	}
	if (secure) {
		options.secure = secure;
	}
	if (httpOnly) {
		options.httpOnly = httpOnly;
	}
	if (sameSite) {
		options.sameSite = sameSite;
	}
	try {
		res.cookie(cookieName, cookieValue, options)
		res.status(200).send({
			options
		})
	} catch (error) {
		res.status(500).send(error.message)
	}
})

app.listen(1234)