/**
 * Option 1 with uncontrolled file input (basically almost regular JS)
 */
export function OptionOne() {
	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		// Prevent the default behavior of the form, which is to reload the page.
		e.preventDefault();

		fetch('https://api-stage.greengage.dev/upload', {
			method: 'POST',
			body: new FormData(e.currentTarget),
			headers: {
				// Remember that this request has to be authenticated. So pass in the token inside the authorization header.
				authorization: 'Bearer ' + 'your_token_here',
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.path && data.type) {
					console.log(data);
					/**
					 * Trigger graphql mutation
					 * Pass in the file path and type to the mutation.
					 */
				}
			})
			.catch((err) => {
				// Handle error here
				console.error(err);
			})
			.finally(() => {
				// Trigger some code here at the end of everything
				// e.g. set loading state to false here
			});
	}

	return (
		<form onSubmit={onSubmit}>
			<input
				// The name attribute is used to identify the form data after the form is submitted.
				// Name it either files or file to easily identify the file input field.
				name="files"
				// This type sets the input field to a file input field and enables you to select files from your computer.
				type="file"
				// Inside the accept attribute, you should specify the file types you want to accept.
				accept="image/svg, image/png, image/jpeg"
				// If you want to allow multiple files, you can use add additionally the `multiple` attribute.
			/>
			<button type="submit">Upload</button>
		</form>
	);
}
