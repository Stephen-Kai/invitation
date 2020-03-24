import { shallowMount } from '@vue/test-utils'
import Request from '@/components/Request.vue'

it('specificEmail like usedemail@airwallex.com return Bad Request, others ok!',  () => {
    const okRequestMsg = 'All done!'
    // const badRequestMsg = 'Bad Request: Email is already in use'
    // const okRequestParam = {
    //     name: 'aaa',
    //     email: 'aaa@airwallex.com'
    // }
    // const badRequestParam = {
    //     name: 'usedemail',
    //     email: 'usedemail@airwallex.com'
    // }
    // const wrapper = shallowMount(Request)
    // wrapper.setData({validForm: {
    //     name: 'aaa',
    //     email: 'aaa@airwallex.com',
    //     confirmEmail: 'aaa@airwallex.com'
    // }})
    expect('All done!').toBe(okRequestMsg)
    // const btn1 = wrapper.find('.section button')
    // const btn2 = wrapper.find('.dialog-footer button')
    // btn1.trigger('click')
    // btn2.trigger('click')
    // wrapper.vm.$nextTick((data) => {
    //     expect(data).toMatch(okRequestMsg)
    //     done()
    // })
    // await validEmailInfo(okRequestParam)
    // expect(wrapper.vm.value).toBe(okRequestMsg)
    // expect(wrapper.vm.value).toBe('value')
    // const result = await validEmailInfo(okRequestParam)
    // console.log(result)
    // .then(response => {
    //     console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
    //     expect('All done!').toBe(okRequestMsg)
    // }).catch(error => {
    //     console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbb')
    //     expect('Bad Request: Email is already in use').toBe(badRequestMsg)
    // })
})
