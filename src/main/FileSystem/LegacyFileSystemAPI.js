import FileUtils from 'react-event-base/FileUtils';
import ObjectUtils from 'react-event-base/ObjectUtils';

function fileTypesToExts(fileTypes) {
	const exts = [];
	ObjectUtils.forEach(fileTypes, fileType => {
		ObjectUtils.forEach(fileType.accept, entry => {
			if(Array.isArray(entry)) {
				exts.push.apply(exts, entry);
			} else if(typeof entry === 'string') {
				exts.push.apply(exts, [entry]);
			}
		});
	});
	return exts;
}

class LegacyFileSystemAPI {

	_createReadAPI(file) {
		return {
			getInfo: () => {
				return {
					kind: 'file',
					name: file.name,
				};
			},
			getFile: async () => {
				return file;
			},
		};
	}

	_createWriteAPI(file) {
		return {
			write: async (content) => {
				if(content instanceof Blob ) {
					await FileUtils.saveFile(file.name, content);
				} else if(typeof content === 'string') {
					let blob = await FileUtils.textToFile(content, file.name);
					await FileUtils.saveFile(file.name, blob);
				}
			},
			...this._createReadAPI(file),
		};
	}

	async newFile(fileTypes, content) {
		console.warn('Unsupported API: newFile');
	}

	async openDirectory() {
		console.warn('Unsupported API: openDirectory');
	}

	async openFile(fileTypes) {
		const exts = fileTypesToExts(fileTypes);
		const file = await FileUtils.openFile(exts);
		return await this._createWriteAPI(file);
	}

	async openFiles() {
		console.warn('Unsupported API: openFiles');
	}

	async _saveFile(name, content) {
		
	}

	async saveFile(_fileTypes, name, content) {
		const fileAPI = this._createWriteAPI({
			name: name,
		});
		await fileAPI.write(content);
		return fileAPI;
	}

}

export default LegacyFileSystemAPI;
