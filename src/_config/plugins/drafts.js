function eleventyComputedPermalink() {
	return( data ) => {
		// Always skip during non-watch/serve builds
		if ( data.draft && !process.env.BUILD_DRAFTS ) {
			return false;
		}
		return data.permalink;
	}
};

function eleventyComputedExcludeFromCollections() {
	return( data ) => {
		// Always exclude from non-watch/serve builds
		if ( data.draft && !process.env.BUILD_DRAFTS ) {
			return true;
		}
		return data.eleventyExcludeFromCollections;
	}
};

export default.eleventyComputedPermalink = eleventyComputedPermalink;
export default.eleventyComputedExcludeFromCollections = eleventyComputedExcludeFromCollections;

export default = eleventyConfig => {
	eleventyConfig.addGlobalData('eleventyComputed.permalink', eleventyComputedPermalink);
	eleventyConfig.addGlobalData('eleventyComputed.eleventyExcludeFromCollections', eleventyComputedExcludeFromCollections);

	let logged = false;
	eleventyConfig.on('eleventy.before', ({runMode}) => {
		let text = 'Excluding';
		// Only show drafts in serve/watch modes
		if ( runMode === 'serve' || runMode === 'watch' ) {
			process.env.BUILD_DRAFTS = true;
			text = "Including";
		}

		// Only log once.
		if ( !logged ) {
			console.log( `[11ty] ${text} drafts` );
		}

		logged = true;
	});
}
