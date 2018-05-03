import React,{ Component } from 'react'
import { observer } from 'mobx-react/native'
import { toJS } from 'mobx' 
import {
    RefreshControl,
    StyleSheet,
    ListView,
    View,
    Text
} from 'react-native'
import {
    Color,
    ListItem
} from '../../../UiLibrary'
import { profileStore } from '../../storeSingleton'

@observer
class FriendList extends Component {
	ds=new ListView.DataSource({
		rowHasChanged:(r1,r2)=>r1!=r2,
		sectionHeaderHasChanged:(s1,s2)=>s1!=s2 
	})

	renderRow(row){
		return (
			<ListItem.Label
                icon={row.avatar}
                labelText={row.name}
                labelStyle={row.status === 'online' ? styles.online : ''}
                onPress={()=>{
                    this.props.navigation.navigate('ChatRoom',{
                        toInfo:{
                            userId: row.userId,
                            avatar: row.avatar,
                            name: row.name
                        }
                    })
                }}
            />
		)
	}
	renderSectionHeader(sectionData, sectionID){
		 return (
            <ListItem.Header
                title={sectionID.toUpperCase()}
            />
        )
	}
	render(){
		return (
			<View style={styles.container}>
				<ListView 
					style={styles.container}
                    dataSource={this.ds.cloneWithRowsAndSections(toJS(profileStore.friendList))}
                    renderSectionHeader={this.renderSectionHeader.bind(this)}
                    renderRow={this.renderRow.bind(this)}
                    showsVerticalScrollIndicator={false}
                	enableEmptySections={true}
                />
			</View>
		)
	}
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    online: {
        color: Color.WechatGreen
    }
})

export default FriendList