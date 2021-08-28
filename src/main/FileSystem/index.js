import LegacyFileSystemAPI from './LegacyFileSystemAPI';
import FileSystemAPI from './FileSystemAPI';

const isSupportFileSystemAPI = () => {
  return !!window.showOpenFilePicker && !!window.showSaveFilePicker && !!window.showDirectoryPicker;
};

export default {
	version: "0.0.1",
	isSupportFileSystemAPI: isSupportFileSystemAPI,
	createAPI: () => {
		if(isSupportFileSystemAPI()) {
			return new FileSystemAPI();
		} else {
			return new LegacyFileSystemAPI();
		}
	},
}
