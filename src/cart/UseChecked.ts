import {useCallback, useReducer} from 'react'

type CheckedMap = { [key: string]: boolean }

const CHECKED_CHANGE = 'CHECKED_CHANGE'
const CHECKED_ALL_CHANGE = 'CHECKED_ALL_CHANGE'
const SET_CHECKED_MAP = 'SET_CHECKED_MAP'
const CHECKED_OTHER_CHANGE = 'CHECKED_OTHER_CHANGE'

type CheckedChange<T> = {
    type: typeof CHECKED_CHANGE
    payload: {
        dataItem: T
        checked: boolean
    }
}

type CheckedAllChange = {
    type: typeof CHECKED_ALL_CHANGE
    payload: boolean
}

type SetCheckedMap = {
    type: typeof SET_CHECKED_MAP
    payload: CheckedMap
}
type CheckedOtherMap = {
    type: typeof CHECKED_OTHER_CHANGE,
    payload: string[]
}

type Action<T> = CheckedChange<T> | CheckedAllChange | SetCheckedMap | CheckedOtherMap
export type onSelectCart<T> = (item: T, checked: boolean) => any


const initialState = Object.create(null, {})

/**
 * 提供勾选、全选、反选等功能
 * 提供筛选勾选中的数据的函数
 * 在数据更新的时候自动剔除陈旧项
 */
const cartReducer = <T extends Record<string, any>>(dataSource: T[]) => {
    return (checkedMapParam: CheckedMap, action: Action<T>) => {
        switch (action.type) {
            case CHECKED_CHANGE: {
                const {payload} = action
                const {dataItem: item, checked} = payload

                return {
                    ...checkedMapParam,
                    [item.id]: checked
                }
            }

            case CHECKED_ALL_CHANGE: {
                const {payload} = action
                const newCheckedMap: CheckedMap = {}
                // 全选
                if (payload) {
                    dataSource.forEach(item => {
                        if (!newCheckedMap[item.id]) {
                            newCheckedMap[item.id] = true
                        }
                    })
                }
                return newCheckedMap
            }

            case SET_CHECKED_MAP: {
                return action.payload
            }

            case CHECKED_OTHER_CHANGE: {
                const checkedCart = action.payload

                const otherDataSource: CheckedMap = {}
                dataSource.forEach(item => {
                    otherDataSource[item.id] = !checkedCart.includes(item.id)
                })
                return otherDataSource
            }

            default:
                return checkedMapParam
        }
    }
}

export const useChecked = <T extends Record<string, any>>(dataSource: T[]) => {

    const [selectedCart, dispatch] = useReducer(
        cartReducer(dataSource),
        initialState
    )


    /** 筛选出勾选项 可以传入filter函数继续筛选 */
    type FilterCheckedFunc = (item: T) => boolean
    const key = 'id'

    const onSelectedCart = useCallback(
        (func: FilterCheckedFunc = () => true) => {
            return (
                Object.entries(selectedCart)
                    .filter(entries => Boolean(entries[1]))
                    .map(([checkedId]) =>
                        dataSource.find(({[key]: id}) => id === Number(checkedId))
                    )
                    // 有可能勾选了以后直接删除 此时id虽然在checkedMap里 但是dataSource里已经没有这个数据了
                    // 先把空项过滤掉 保证外部传入的func拿到的不为undefined
                    .filter(Boolean)
                    .filter(func as any) as T[]
            )
        },
        [selectedCart, dataSource, key]
    )


    /** 勾选状态变更 */
    const onSelectCart: onSelectCart<T> = (dataItem, checked) => {
        dispatch({
            type: CHECKED_CHANGE,
            payload: {
                dataItem,
                checked
            }
        })
    }

    /** 全选/全不选函数 */
    const onSelectAllCart = (newCheckedAll: boolean) => {
        dispatch({
            type: CHECKED_ALL_CHANGE,
            payload: newCheckedAll
        })
    }

    /** 反选*/
    const onReverseSelectCart = () => {
        dispatch({
            type: CHECKED_OTHER_CHANGE,
            payload: onSelectedCart().map(item => item.id)
        })
    }

    /** 是否全选状态 */
    const selectAllCartFlag = Boolean(dataSource.length) && (onSelectedCart().length === dataSource.length)


    return {
        selectedCart,
        dispatch,
        selectAllCartFlag,
        onSelectedCart,
        onSelectCart,
        onSelectAllCart,
        onReverseSelectCart
    }
}
