import { observable,action,runInAction } from 'mobx'
import axios from 'axios'
import moment from 'moment'

class OrderFormStore{
	@observable initData=null
	@observable orderNumber=''

	STORAGE_ORDER_NUMBER_PQ='配'
	STORAGE_ORDER_NUMBER = 'STORAGE_ORDER_NUMBER'

	//获取定值单模块的初始数据
	@action getInitData=async ()=>{
		const res=await axios.get('/valued_order_options')

        if(res.code===200){
            runInAction(()=>{
                this.initData=res.data
            })
        }
        return res
	}
	//设置定值单编号
	@action getOrderNumber=async (pqIndex)=>{
		const pq=pqIndex || this.STORAGE_ORDER_NUMBER_PQ
		const year=moment().format('YYYY')
		const params={prefix:pq+year}
		const value=sessionStorage.getItem(`${this.STORAGE_ORDER_NUMBER}_${pq}`)

		if(value){
			this.orderNumber=value
		}else{
			const res=await axios.get('/vo/id',{params})

			if(res.code===200){
				runInAction(()=>{
					const orderNumber=params.prefix+'-'+res.data.id

					sessionStorage.setItem(`${this.STORAGE_ORDER_NUMBER}_${pq}`,orderNumber)
					this.orderNumber=orderNumber
				})
			}
		}
	}
	//清楚缓存中的定值单编号
	@action removeOrderNumberStorage=(pqIndex)=>{
		sessionStorage.removeItem(`${this.STORAGE_ORDER_NUMBER}_${pqIndex}`)
		this.orderNumber=''
	}
	
}

export default OrderFormStore