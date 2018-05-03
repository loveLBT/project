import ProfileStore from './store/ProfileStore.js'
import SocketStore from './store/SocketStore.js'

const socketStore=new SocketStore()
const profileStore=new ProfileStore(socketStore)


export {
	profileStore,
	socketStore
}