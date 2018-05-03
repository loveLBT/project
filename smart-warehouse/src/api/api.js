import Server from './server'

class API extends Server {

	async getListToolParentType(){
		let res = await this.axios('get', '/toolParentType/getListToolParentType')
		return res;
	}

	/**
	 * 获取物品出入日志
	 * @param {any} datas 
	 * @returns 
	 * @memberof API
	 */
	async getListToolJournal(datas){
		let res = await this.axios('get', '/tool/getListToolJournal', {params:datas})
		return res;
	}

	/**
	 * 导出并下载当前筛选的日志
	 * @param {any} datas 
	 * @returns 
	 * @memberof API
	 */
	async exportToolJournal(datas){
		let res = await this.axios('post', '/tool/exportToolJournal', {params:datas})
		return res;
	}

	/**
	 * 导出并下载当前筛选的领取记录
	 * @param {any} datas 
	 * @returns 
	 * @memberof API
	 */
	async exportToolNotIn(datas){
		let res = await this.axios('post', '/tool/exportToolNotIn', {params:datas})
		return res;
	}

	/**
	 * 修改公司名称
	 * @param {any} name 
	 * @returns 
	 * @memberof API
	 */
	async updateCompany(name){
		let res = await this.axios('put', '/company/updateCompany', {data:{company_name:name}})
		return res;
	}

	/**
	 * 登录接口
	 * @param {any} data 
	 * @returns 
	 * @memberof API
	 */
	async login(data){
		let res = await this.axios('post','/index/login',{data:data});
		return res;
	}

	/**
	 * 获取站点列表
	 * @returns 
	 * @memberof API
	 */
	async getListSite(pageNum,pageSize){
		let res = await this.axios('get', '/site/getListSite',{params:{pageSize:pageSize || 2,pageNum:pageNum || 1}})
		return res;
	}


	/**
	 * 使用登记物品列表
	 * @returns 
	 * @memberof API
	 */
	async getListToolNotRegister(pageNum,pageSize){
		let res = await this.axios('get', '/tool/getListToolNotRegister',{params:{pageSize:pageSize || 2,pageNum:pageNum || 1}})
		return res;
	}
	

	/**
	 * 添加站点列表
	 * @param {any} name 
	 * @returns 
	 * @memberof API
	 */
	async insertSite(name){
		let res = await this.axios('post', '/site/insertSite',{data:name})
		return res;
	}

	/**
	 * 删除站点列表
	 * @param {any} id 
	 * @returns 
	 * @memberof API
	 */
	async deleteSite(id){
		let res = await this.axios('delete', `/site/deleteSite/${id}`)
		return res;
	}

	/**
	 * 修改站点列表
	 * @param {any} data 
	 * @returns 
	 * @memberof API
	 */
	async updateSite(site_id,data){
		let res = await this.axios('put', `/site/updateSite/${site_id}`,{data})
		return res;
	}

	/**
	 * 获取库房列表
	 * @returns 
	 * @memberof API
	 */
	async getStorageRoomList(pageNum,pageSize){
		let res = await this.axios('get', '/storageRoom/getStorageRoomList',{params:{pageSize:pageSize || 2,pageNum:pageNum || 1}})
		return res;
	}

	/**
	 * 修改库房
	 * @param {any} data 
	 * @returns 
	 * @memberof API
	 */
	async updateStorageRoom(storage_room_id,data){
		let res = await this.axios('put', '/storageRoom/updateStorageRoom/'+storage_room_id,{data})
		return res;
	}

	/**
	 * 修改路径点权限
	 * @param {any} storage_room_id 房间 id
	 * @param {any} data 
	 * @returns 
	 * @memberof API
	 */
	async updatePathPointStorageRoomAuthority(storage_room_id,data){
		let res = await this.axios('put', '/pathPointStorageRoomAuthority/updatePathPointStorageRoomAuthority/'+storage_room_id,{data})
		return res;
	}

	/**
	 * 新增库房
	 * @param {any} data 
	 * @returns 
	 * @memberof API
	 */
	async insertStorageRoom(data){
		let res = await this.axios('post', '/storageRoom/insertStorageRoom',{data})
		return res;
	}

	/**
	 * 新增人员
	 * @param {any} data 
	 * @returns 
	 * @memberof API
	 */
	async insertUser_user(data){
		let res = await this.axios('POST', '/user/insertUser',{data})
		return res;
	}


	/**
	 * 人员列表
	 * @returns 
	 * @memberof API
	 */
	async getListUserDetail_user(pageNum,pageSize){
		let res = await this.axios('get', '/user/getListUserDetail',{params:{pageSize:pageSize || 2,pageNum:pageNum || 1}})
		return res;
	}

	/**
	 * 删除人员
	 * @returns 
	 * @memberof API
	 */
	async deleteUser_user(uid){
		let res = await this.axios('delete', `/user/deleteUser/${uid}`)
		return res;
	}


	/**
	 * 新增设备类型
	 * @param {any} values 
	 * @returns 
	 * @memberof API
	 */
	async insertEquipmentType(values){
		let res = await this.axios('post', '/equipmentType/insertEquipmentType',{data:values})
		return res;
	}

	/**
	 * 获取设备类型列表
	 * @returns 
	 * @memberof API
	 */
	async getListEquipmentType(pageNum,pageSize){
		let res = await this.axios('get','/equipmentType/getListEquipmentType',{params:{pageSize:pageSize || 2,pageNum:pageNum || 1}})
		return res;
	}
	
	/**
	 * 修改设备类型
	 * @returns 
	 * @memberof API
	 */
	async updateEquipmentType(equipment_type_id,data){
		let res = await this.axios('put', `/equipmentType/updateEquipmentType/${equipment_type_id}`,{data})
		return res;
	}

	/**
	 * 删除设备类型
	 * @returns 
	 * @memberof API
	 */
	async deleteEquipmentType(equipment_type_id){
		let res = await this.axios('delete', `/equipmentType/deleteEquipmentType/${equipment_type_id}`)
		return res;
	}


	/**
	 * 新增设备
	 * @param {any} values 
	 * @returns 
	 * @memberof API
	 */
	async insertEquipment(values){
		let res = await this.axios('post', '/equipment/insertEquipment',{data:values})
		return res;
	}

	/**
	 * 获取设备列表
	 * @returns 
	 * @memberof API
	 */
	async getListEquipmentDetail(pageNum,pageSize){
		let res = await this.axios('get','/equipment/getListEquipmentDetail',{params:{pageSize:pageSize || 2,pageNum:pageNum || 1}})
		return res;
	}

	/**
	 * 修改设备
	 * @returns 
	 * @memberof API
	 */
	async updateEquipment(equipment_id,data){
		let res = await this.axios('put', `/equipment/updateEquipment/${equipment_id}`,{data})
		return res;
	}

		/**
	 * 删除设备类型
	 * @returns 
	 * @memberof API
	 */
	async deleteEquipment(equipment_id){
		let res = await this.axios('delete', `/equipment/deleteEquipment/${equipment_id}`)
		return res;
	}

		/**
	 * 新增设备
	 * @param {any} values 
	 * @returns 
	 * @memberof API
	 */
	async insertSubEquipmentType(values){
		let res = await this.axios('post', '/subEquipmentType/insertSubEquipmentType',{data:values})
		return res;
	}

	/**
	 * 获取设备列表
	 * @returns 
	 * @memberof API
	 */
	async getListSubEquipmentType(pageNum,pageSize){
		let res = await this.axios('get','/subEquipmentType/getListSubEquipmentType',{params:{pageSize:pageSize || 2,pageNum:pageNum || 1}})
		return res;
	}

	/**
	 * 修改设备
	 * @returns 
	 * @memberof API
	 */
	async updateSubEquipmentType(sub_equipment_type_id,data){
		let res = await this.axios('put', `/subEquipmentType/updateSubEquipmentType/${sub_equipment_type_id}`,{data})
		return res;
	}

		/**
	 * 删除设备类型
	 * @returns 
	 * @memberof API
	 */
	async deleteSubEquipmentType(sub_equipment_type_id){
		let res = await this.axios('delete', `/subEquipmentType/deleteSubEquipmentType/${sub_equipment_type_id}`)
		return res;
	}

			/**
	 * 新增子设备
	 * @param {any} values 
	 * @returns 
	 * @memberof API
	 */
	async insertSubEquipment(values){
		let res = await this.axios('post', '/subEquipment/insertSubEquipment',{data:values})
		return res;
	}

	/**
	 * 获取设备列表
	 * @returns 
	 * @memberof API
	 */
	async getListSubEquipmentDetail(pageNum,pageSize){
		let res = await this.axios('get','/subEquipment/getListSubEquipmentDetail',{params:{pageSize:pageSize || 2,pageNum:pageNum || 1}})
		return res;
	}

	/**
	 * 修改设备
	 * @returns 
	 * @memberof API
	 */
	async updateSubEquipment(sub_equipment_id,data){
		let res = await this.axios('put', `/subEquipment/updateSubEquipment/${sub_equipment_id}`,{data})
		return res;
	}

		/**
	 * 删除设备类型
	 * @returns 
	 * @memberof API
	 */
	async deleteSubEquipment(sub_equipment_id){
		let res = await this.axios('delete', `/subEquipment/deleteSubEquipment/${sub_equipment_id}`)
		return res;
	}


	/**
	 * 新增物品类型
	 * @param {any} values 
	 * @returns 
	 * @memberof API
	 */
	async insertToolType(values){
		let res = await this.axios('post', '/toolType/insertToolType',{data:values})
		return res;
	}

	/**
	 * 获取物品类型列表
	 * @returns 
	 * @memberof API
	 */
	async getListToolType(pageNum,pageSize){
		let res = await this.axios('get','/toolType/getListToolType',{params:{pageSize:pageSize || 2,pageNum:pageNum || 1}})
		return res;
	}
	/**
	 * 新增物品
	 * @param {any} values 
	 * @returns 
	 * @memberof API
	 */
	async insertTool(values){
		let res = await this.axios('post', '/tool/saveTool',{data:values})
		return res;
	}
	/**
	 * 修改物品
	 * @returns 
	 * @memberof API
	 */
	async updateTool(tool_id,data){
		console.log(data)
		let res = await this.axios('put', `/tool/updateTool//${tool_id}`,{data})

		return res;
	}
	/**
	 * 获取物品信息列表
	 * @returns 
	 * @memberof API
	 */
	async getListToolList(pageNum,pageSize){
		let res = await this.axios('get','/tool/getToolList',{params:{pageSize:pageSize || 2,pageNum:pageNum || 1}})
		return res;
	}
	/**
	 * 删除物品信息
	 * @returns 
	 * @memberof API
	 */
	async deleteTool(tool_type_id){
		let res = await this.axios('delete', `/toolType/deleteToolType/${tool_type_id}`)
		return res;
	}
	/**
	 * 修改物品类型
	 * @returns 
	 * @memberof API
	 */
	async updateToolType(tool_type_id,data){
		let res = await this.axios('put', `/toolType/updateToolType/${tool_type_id}`,{data})
		return res;
	}

		/**
	 * 删除设备类型
	 * @returns 
	 * @memberof API
	 */
	async deleteToolType(tool_type_id){
		let res = await this.axios('delete', `/toolType/deleteToolType/${tool_type_id}`)
		return res;
	}



	/**
	 * 修改人员
	 * @returns 
	 * @memberof API
	 */
	async update_user(uid,data){
		let res = await this.axios('put', `/user/updateUser/${uid}`,{data})
		return res;
	}

	/**
	 * 获取表头
	 * @param {any} param 
	 * @returns 
	 * @memberof API
	 */
	async getFormHeader(param){
		let res = await this.axios('get','/header/getForm?sign='+param)
		return res;
	}

	/**
	 * 获取 表单的控件
	 * @param {any} param 
	 * @returns 
	 * @memberof API
	 */
	async getHeader(param){
		let res = await this.axios('get','/header/getHeader?sign='+param)
		return res
	}


	async getListUserRoomSimple(){
		let res = await this.axios('get','/userStorageRoomAuthority/getListUserRoomSimple')
		return res;
	}

	async updateUserStorageRoomAuthority(storage_room_id,data){
		let res = await this.axios('put','/userStorageRoomAuthority/updateUserStorageRoomAuthority/'+storage_room_id,{data})
		return res;
	}

	async getPathPointDatail(pageNum,pageSize){
		let res = await this.axios('get','/pathPoint/getPathPointDatail',{params:{pageSize:pageSize || 2,pageNum:pageNum || 1}});
		return res
	}


	async updatePathPoint(path_point_id,data){
		let res = await this.axios('put','/pathPoint/updatePathPoint/'+path_point_id,{data})
		return res;
	}

	async getListNotIn(params){
		let res = await this.axios('get','/tool/getListNotIn',{params})
		return res;
	}

}

export default new API();
