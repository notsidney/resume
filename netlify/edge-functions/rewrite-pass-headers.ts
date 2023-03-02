import type { Context } from 'https://edge.netlify.com';

export default async (
	request: Request,
	context: Context
): Promise<Response> => {
	const referer = request.headers.get('referer');

	const prodRegex = /^https?:\/\/(.*\.)?sidney\.me(\/.*)?$/;
	const devRegex = /^https?:\/\/(.*--)?sidney-me\.netlify\.app(\/.*)?$/;

	if (
		referer === null ||
		!(prodRegex.test(referer) || devRegex.test(referer))
	) {
		return new Response('Forbidden', { status: 403 });
	}

	// Get the next HTTP response in the chain
	const response = await context.next(request);
	return response;
};
