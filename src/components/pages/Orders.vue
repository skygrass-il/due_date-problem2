<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <table class="table mt-4">
            <thead>
                <tr>
                    <th width="120">購買時間</th>
                    <th>Email</th>
                    <th>購買款項</th>
                    <th width="120">應付金額</th>
                    <th width="120">是否付款</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,key) in orders" :key="key">
                    <td>{{ item.create_at | time}}</td>
                    <td><span v-if="item.user">{{ item.user.email }}</span></td>
                    <td>
                    <ul class="list-unstyled">
                        <li v-for="(product,i) in item.products" :key="i">
                            {{ product.product.title }} 數量:{{ product.qty }}
                            {{ product.product.unit }}
                        </li>
                    </ul>
                    </td>
                    <td class="text-right">{{ item.total | currency}}</td>
                    <td>
                        <span v-if="item.is_paid" class="text-success">已付款</span>
                        <span v-else class="rexr-muted">尚未啟用</span>
                    </td>
                </tr>
            </tbody>
        </table>

        <Pagination :pages="pagination" @emitPages="getOrders"></Pagination>

    </div>
</template>

<script>
import Pagination from '../Pagination';
export default {
    data() {
        return {
            orders:[],
            isLoading:false,
            pagination:{},
        }
    },
    components:{
        Pagination,
    },
    methods:{
        getOrders(page=1) {
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders?page=${page}`;
            const vm = this;
            // console.log(process.env.APIPATH,process.env.CUSTOMPATH);
            vm.isLoading = true;
            this.$http.get(api).then((response)=>{
                console.log(response.data);
                vm.isLoading = false;
                vm.orders = response.data.orders;
                vm.pagination = response.data.pagination;
            });
        },
    },
    created() {
        this.getOrders();
    }
}
</script>


