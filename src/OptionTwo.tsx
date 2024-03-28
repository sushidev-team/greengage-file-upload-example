import { useState } from 'react';

/**
 * Option 2 with controlled file input
 */
export function OptionTwo() {
	const [file, setFile] = useState<File | null>(null);

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		// Prevent the default behavior of the form, which is to reload the page.
		e.preventDefault();

		if (!file) return;

		const data = new FormData();
		data.append('file', file);

		fetch('https://api-stage.greengage.dev/upload', {
			method: 'POST',
			body: data,
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
				// This type sets the input field to a file input field and enables you to select files from your computer.
				type="file"
				// Inside the accept attribute, you should specify the file types you want to accept.
				accept="image/svg, image/png, image/jpeg"
				// The onChange event is triggered after the user selects a file. If you want to allow multiple files, you can use add additionally the `multiple` attribute.
				// The event handler receives an event object, and you can access the selected file through the target.files property.
				// Remember to update the set here if you want to allow to upload multiple files.
				// Right now it only allows one file to be uploaded and only gets the first file from the list even if multiple files are selected.
				onChange={(e) => setFile(e.target.files?.[0] || null)}
			/>
			<button type="submit">Upload</button>
		</form>
	);
}
