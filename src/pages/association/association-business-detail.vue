<template>
  <div class="mg-detail">

    <Divider orientation="left" v-if="!isEdit">新增 商品</Divider>
    <Divider orientation="left" v-if="isEdit">编辑 商品</Divider>

    <div style="max-width: 500px; text-align: left">
      <Form ref="formData" :model="formData" :rules="rules" :label-width="80">

        <FormItem label="商品名（英文）" prop="productName">
          <Input v-model="formData.productName" placeholder="输入商品英文简写"></Input>
        </FormItem>

        <FormItem label="商品名（全称）" prop="productRealname">
          <Input v-model="formData.productRealname" placeholder="输入商品名称"></Input>
        </FormItem>

        <FormItem label="商品类别" prop="categoryId">
            <Select v-model="formData.categoryId" @on-change="confimCategory" :disabled="isEdit">
                 <Option v-for="(item, idx) in categoryOptions" :key="idx" :value="item.cid">{{item.category_name}} ({{item.category_realname}})</Option>
            </Select>
        </FormItem>

        <FormItem label="商品价格" prop="productPrice">
          <Input v-model="formData.productPrice" placeholder="请输入商品价格" type="number"></Input>
        </FormItem>

        <FormItem label="商品库存" prop="productCount">
          <Input v-model="formData.productCount" placeholder="请输入商品库存" type="number"></Input>
        </FormItem>

        <FormItem label="商品图片" prop="productImg">
          <Input v-model="formData.productImg" placeholder="输入商品图片"></Input>
        </FormItem>

        <FormItem label="商品状态" prop="productStatus">
          <Select v-model="formData.productStatus">
              <Option v-for="(item, idx) in productStatusOptions" :key="idx" :value="item.id">{{item.value}}</Option>
          </Select>
        </FormItem>

        <FormItem label="商品描述" prop="productDesc">
          <Input v-model="formData.productDesc" placeholder="输入商品描述"></Input>
        </FormItem>

        <FormItem label="供应商名称" prop="supplierId">
            <Select v-model="formData.supplierId" @on-change="confimSupplier" :disabled="isEdit">
                 <Option v-for="(item, idx) in supplierOptions" :key="idx" :value="item.supplier_id">{{item.supplier_name}} ({{item.supplier_realname}})</Option>
            </Select>
        </FormItem>

        <FormItem>
          <Button type="primary" @click="handleSubmit('formData')"  v-if="isEdit">修改商品</Button>
          <Button type="primary" @click="handleSubmit('formData')"  v-if="!isEdit">新建商品</Button>
        </FormItem>

      </Form>
    </div>

  </div>
</template>

<script>
import {firmProductEdit} from '@src/service/firm.js'
import {firmProductCreate} from '@src/service/firm.js'
import {firmProductCategoryList, supplierList} from '@src/service/firm.js'
import {firmProductDetail} from '@src/service/firm.js'


const Handle1 = function (data) {
  var resData = {}
  for (var key in data) {
    let tempData = data[key]
    let _key = key.replace(/\_(\w)/g, function(all, letter){
      return letter.toUpperCase();
    });
    resData[_key] = tempData
  }
  console.log(resData)
  return resData
}
const Handle2 = function (argument) {
   for (var key in data) {
    let _key = key.replace(/([A-Z])/g,"-$1").toLowerCase()
    data[_key] = data[key]
  }
  return data
}
export default {
  name: 'AssociationBusinessDetail',
  data() {
    let isEdit = Boolean(this.$route.query.mode != 'new')
    return {
      isEdit: isEdit,
      formData: {
        productName: '',
        productRealname: '',
        categoryId: null,
        categoryName: '',
        categoryRealname: '',
        supplierId: null,
        supplierName: '',
        supplierRealname: '',
        productPrice: 0,
        productCount: 0,
        productImg: '',
        productStatus: 1,
        productDesc: ''
      },
      rules: {
        productName: [
          { required: true, message: '商品名称不能为空', trigger: 'blur' }
        ],
        productRealname: [
          { required: true, message: '商品全称不能为空', trigger: 'blur' }
        ],
        categoryId: [
          { required: true, type: 'number', message: '请选择商品类别', trigger: 'blur' },
        ],
        supplierId: [
          { required: true, type: 'number', message: '请选择供应商', trigger: 'blur' },
        ],
        productPrice: [
          { required: true,  type: 'number', message: '商品价格不能为空', trigger: 'blur', transform(value) {
            return Number(value);
          }}
        ],
        productCount: [
          { required: true,  type: 'number', message: '商品数量不能为空', trigger: 'blur', transform(value) {
            return Number(value);
          }}
        ],
        productImg: [
          { required: true, message: '商品图片不能为空', trigger: 'blur' }
        ],
        productStatus: [
          { required: true, type: 'number', message: '请选择商品状态', trigger: 'blur' }
        ],
        productDesc: [
          { required: true, message: '商品描述不能为空', trigger: 'blur' }
        ]
      },
      categoryOptions: [],
      supplierOptions: [],
      categoryData: {},
      SupplierData: {},
      productStatusOptions: [
        {
          id: 1,
          value: '状态正常'
        },
        {
          id: 2,
          value: '状态失效'
        }
      ]
    }
  },
  watch: {
    '$route' (to, from) {
      let me = this;
      if(to.name == 'association_business_detail') {
        me.fetch()
      }
    }
  },
  mounted() {
    window.test = this;
    let me = this;
    me.fetch()
  },
  methods: {
    handleSubmit(name) {
      let me = this;
      let fun
      if (me.isEdit) {
        fun = firmProductEdit
      } else {
        fun = firmProductCreate
      }
      this.$refs[name].validate((valid) => {
        if (valid) {
          let formData = Object.assign({}, me.formData, me.isEdit ? {
            fid: me.$route.query.fid,
            pid: me.$route.query.pid
          }: {
            fid: me.$route.query.fid
          })
          fun(formData).then ((res) => {
            if(res.errorCode == 0) {
               me.$Message.success('商品操作成功');
               setTimeout(() => {
                me.$router.push({ 
                  name: 'association_business',
                  query: {
                    fid: me.$route.query.fid,
                    firmname: me.$route.query.firmname
                  }
                })
               }, 2000)
            }
          }, () => {
            me.$Message.error('商品操作失败');
          })
        } else {
          me.$Message.error('请检查填写');
        }
      })
    },
    fetch() {
      let me = this;
      firmProductCategoryList({
        fid: me.$route.query.fid,
      }).then((res) => {
        if(res.errorCode == 0) {
          me.categoryOptions = res.data.list || []
          res.data.list.map((item) => {
            me.categoryData[item.cid] = {
              categoryName: item.category_name,
              categoryRealname: item.category_realname
            }
          })
        } else {
          me.$Message.error(res.errorMsg + ":" + res.info);
        }
      }, () => {
        me.$Message.error('商品列表拉取失败');
      })

      supplierList().then((res) => {
        if(res.errorCode == 0) {
          me.supplierOptions = res.data.list || []
          res.data.list.map((item) => {
            me.SupplierData[item.supplier_id] = {
              supplierName: item.supplier_name,
              supplierRealname: item.supplier_realname
            }
          })
        } else {
          me.$Message.error(res.errorMsg + ":" + res.info);
        }
      }, () => {
        me.$Message.error('供应商列表拉取失败');
      })

      if (me.isEdit) {
        firmProductDetail({
          fid: me.$route.query.fid,
          pid: me.$route.query.pid,
        }).then((res) => {
          if(res.errorCode == 0) {
            res.data.product_status = parseInt(res.data.productStatus, 10)
            res.data.category_id = parseInt(res.data.productStatus, 10)
            res.data.product_price = parseInt(res.data.productPrice, 10)
            res.data.product_count = parseInt(res.data.productCount, 10)
            me.formData = Handle1(res.data.info) || []
          } else {
            me.$Message.error(res.errorMsg + ":" + res.info);
          }
        }, () => {
          me.$Message.error('商品详情拉取失败');
        })
      }
    },
    confimCategory(val) {
      let me = this;
      me.formData.categoryName = me.categoryData[val].categoryName
      me.formData.categoryRealname = me.categoryData[val].categoryRealname
    },
    confimSupplier(val) {
      me.formData.supplierName = me.categoryData[val].supplierName
      me.formData.supplierRealname = me.categoryData[val].supplierRealname
    }
  }
}
</script>
<style lang="less" scoped>
.mg-detail{
  padding: 40px;
}
</style>
