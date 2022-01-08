<template>
  
</template>

<script>
import CustomTable from '@/components/table'
export default {
  name: 'Index',
  components: {
    CustomTable,
  },
  data() {
    return {
      loading: false,
      tableHead: [],
      tableData: []
    }
  },
  methods: {
    async loadData () {
      this.loading = true
      try {
        
      } catch (error) {
        console.error(error)
        throw error
      } finally {
        this.loading = false
      }
    }
  },
  mounted() {
    
  }
}
</script>

<style>

</style>