async function verifyPermission(fileHandle, mode) {
	const options = {
		mode: mode
	};
	// Check if permission was already granted. If so, return true.
	if ((await fileHandle.queryPermission(options)) === 'granted') {
  		return true;
	}
	// Request permission. If the user grants permission, return true.
	if ((await fileHandle.requestPermission(options)) === 'granted') {
  		return true;
	}
	// The user didn't grant permission, so return false.
	return false;
}
async function verifyReadPermission(fileHandle) {
	return await verifyPermission(fileHandle, 'read');
}
async function verifyReadWritePermission(fileHandle) {
	return await verifyPermission(fileHandle, 'readwrite');
}

// FileType: {
// 	description: 'Json File',
// 	accept: {
// 		'application/json: '.json,
// 	},
// }
class FileSystemAPI {

	_createReadAPI(fileHandle) {
		return {
			getInfo: () => {
				return {
					kind: fileHandle.kind,
					name: fileHandle.name,
				};
			},
			getFile: async () => {
				return await fileHandle.getFile();
			},
		}
	}

	_createWriteAPI(fileHandle) {
		return {
			write: async (content) => {
				const writable = await fileHandle.createWritable();
				await writable.write(content);
				await writable.close();
			},
			...this._createReadAPI(fileHandle),
		}
	}

	async newFile(fileTypes, content) {
		const options = {
			excludeAcceptAllOption: true,
			types: fileTypes,
		};
		const fileHandle = await window.showSaveFilePicker(options);
		const isGranted = await verifyReadWritePermission(fileHandle);
		if(isGranted) {
			const fileAPI = this._createWriteAPI(fileHandle);
			if(content) {
				await fileAPI.write(content);
			}
			return fileAPI;
		} else {
			const isReadGranted = await verifyReadPermission(fileHandle);
			if(isReadGranted) {
				return this._createReadAPI(fileHandle);
			} else {
				return {};
			}
		}
	}

	async openDirectory(fileName) {
		try {
			const dirHandle = await window.showDirectoryPicker();
			if(dirHandle && fileName) {
				const fileHandle = await dirHandle.getFileHandle(fileName, { create: true });
				const fileAPI = this._createWriteAPI(fileHandle);
				return fileAPI;
			}
		} catch(err) {
			console.log(err);
		}
	}

	async openFile(fileTypes) {
		const fileHandles = await window.showOpenFilePicker({
			multiple: false,
			excludeAcceptAllOption: true,
			types: fileTypes,
		});
		const fileHandle = fileHandles[0];
		if(fileHandle) {
			const isGranted = await verifyReadWritePermission(fileHandle);
			if(isGranted) {
				const fileAPI = this._createWriteAPI(fileHandle);
				return fileAPI;
			} else {
				const isReadGranted = await verifyReadPermission(fileHandle);
				if(isReadGranted) {
					return this._createReadAPI(fileHandle);
				} else {
					return {};
				}
			}
		}
	}

	async openFiles(fileTypes) {
		const fileHandles = await window.showOpenFilePicker({
			multiple: true,
			excludeAcceptAllOption: true,
			types: fileTypes,
		});
		return fileHandles;
	}

	async saveFile(fileTypes, _name, content) {
		const fileHandle = await window.showSaveFilePicker({
			excludeAcceptAllOption: true,
			types: fileTypes,
		});
		const isGranted = await verifyReadWritePermission(fileHandle);
		if(isGranted) {
			const fileAPI = this._createWriteAPI(fileHandle);
			if(content) {
				await fileAPI.write(content);
			}
			return fileAPI;
		} else {
			const isReadGranted = await verifyReadPermission(fileHandle);
			if(isReadGranted) {
				return this._createReadAPI(fileHandle);
			} else {
				return {};
			}
		}
	}

}

export default FileSystemAPI;
