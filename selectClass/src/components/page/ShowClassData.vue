<template>
    <div style="height: auto">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 展示选课
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-table
                    :data="tableData"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    style="width: 98%">
                <el-table-column prop="selectTime" label="选课开始时间" align="center"></el-table-column>
                <el-table-column prop="selectEndTime" label="选课结束时间" align="center"></el-table-column>
                <el-table-column prop="quitTime" label="退选开始时间" align="center"></el-table-column>
                <el-table-column prop="quitEndTime" label="退选结束时间" align="center"></el-table-column>
                <el-table-column prop="bxTime" label="补选开始时间" align="center"></el-table-column>
                <el-table-column prop="bxEndTime" label="补选结束时间" align="center"></el-table-column>
                <el-table-column prop="minCount" label="最少选课人数" align="center"></el-table-column>
                <el-table-column prop="nowCount" label="已选课人数" align="center"></el-table-column>
                <el-table-column prop="name" label="课程名" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="showClassData(scope.$index, scope.row)"
                    >查看</el-button>
                    <el-button
                            type="text"
                            icon="el-icon-down"
                            class="red"
                            @click="down(scope.$index, scope.row)"
                    >下载</el-button>
                </template>
            </el-table-column>
            </el-table>
        </div>
        <!-- 查看弹出框 -->
        <el-dialog title="classname" :visible.sync="checkVisible" width="70%">
            <div slot="title">
                <span v-show="classname" style="font-size: 26px">{{ classname }}</span>
            </div>
            <div style="margin-left: 50px">
                <div style="margin-bottom: 20px;width: 45%;float: right" v-if = "!showTable">
                    <div style="display: inline;margin: 10px 10px 10px -50px;font-size: 18px"><label>已选:</label></div>
                    <div v-for="(item,index) in selectList" style="display:inline">
                        <el-button  @click="handleSelect(item)" :type="item.btType" style="margin:10px">{{item.showData}}</el-button>
                    </div>
                </div>
                <div>
                    <div style="margin-top: 10px;margin-bottom: 20px;width: 50%;">
                        <div style="display: inline;font-size: 18px;margin: 10px 10px 10px -50px;"><label>年级:</label></div>
                        <div v-for="(item,index) in gradeList" style="display:inline">
                            <el-button  @click="handleGrade(item)" :type="item.btType" style="margin:10px">{{item.grade}}</el-button>
                        </div>
                    </div>
                    <div style="margin-bottom: 20px;width: 50%;">
                        <div style="display: inline;margin: 10px 10px 10px -50px;font-size: 18px"><label>学院:</label></div>
                        <div v-for="(item,index) in collegeList" style="display:inline">
                            <el-button  @click="handleCollege(item)" :type="item.btType" style="margin:10px">{{item.college}}</el-button>
                        </div>
                    </div>
                    <div style="margin-bottom: 20px;width: 50%;">
                        <div style="display: inline;margin: 10px 10px 10px -50px;font-size: 18px"><label>专业:</label></div>
                        <div v-for="(item,index) in professionList" style="display:inline">
                            <el-button  @click="handleProfession(item)" :type="item.btType" style="margin:10px">{{item.profession}}</el-button>
                        </div>
                    </div>
                    <div style="margin-bottom: 20px;width: 50%;">
                        <div style="display: inline;margin: 10px 10px 10px -50px;font-size: 18px"><label>班级:</label></div>
                        <div v-for="(item,index) in classList" style="display:inline">
                            <el-button  @click="handleClass(item)" :type="item.btType" style="margin:10px">{{item.class}}</el-button>
                        </div>
                    </div>
                    <div style="margin-bottom: 20px;width: 50%;">
                        <div style="display: inline;margin: 10px 10px 10px -50px;font-size: 18px"><label>状态:</label></div>
                        <div v-for="(item,index) in typeList" style="display:inline">
                            <el-button  @click="handleType(item)" :type="item.btType" style="margin:10px">{{item.type}}</el-button>
                        </div>
                    </div>
                </div>

                <div style="margin-bottom: 20px">
                    <span slot="footer" class="dialog-footer">
                        <div v-if = "!showTable">
                            <el-button type="primary" @click="beginDown()" style="margin-right: 15px;float: right">导出所选</el-button>
                        </div>
                        <el-button type="primary" @click="cleanAll()">清空选择</el-button>
                    </span>
                </div>

                <div v-if = "showTable">
                    <el-table
                            :data="studentData"
                            border
                            class="table"
                            ref="multipleTable"
                            header-cell-class-name="table-header"
                            style="width: 95%">
                        <el-table-column prop="account" label="学号" align="center"></el-table-column>
                        <el-table-column prop="name" label="姓名" align="center"></el-table-column>
                        <el-table-column prop="studentIndex" label="班级" align="center"></el-table-column>
                        <el-table-column prop="type" label="状态" align="center"></el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination
                                background
                                layout="total, prev, pager, next"
                                :current-page="query.pageIndex"
                                :page-size="query.pageSize"
                                :total="pageTotal"
                                @current-change="handlePageChange"
                        ></el-pagination>
                    </div>
                </div>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="checkVisible = false">关 闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {DownloadExcel, getCourseInformation, getStudentInformation} from "../../api";

    export default {
        name: "ShowClassData",
        data() {
            return {
                tableData:[],
                studentData: [],
                gradeList: [],
                collegeList:[],
                professionList:[],
                selectList:[],
                classList:[],
                typeList:[],
                ID: localStorage.getItem('teacherID'),
                query: {
                    url:'',
                    aid: '',
                    cid: '',
                    type:'',
                    status:'',
                    pageIndex: 1,
                    pageSize: 15,
                },
                pageTotal: 0,
                classData:[],
                checkVisible: false,
                showTable: true,
                rowData : '',
                grade: '',
                college: '',
                profession: '',
                classname: '',
                selectClass: '',
            };
        },
        created() {
            this.getData();
        },
        methods: {
            getData() {
                getCourseInformation({
                    id:localStorage.getItem('teacherID')
                }).then(res => {
                    for(let i = 0; i < res.data.length; i++){
                        res.data[i].selectTime = res.data[i].selectTime.replace(' ','\n')
                        res.data[i].selectEndTime = res.data[i].selectEndTime.replace(' ','\n')
                        res.data[i].quitTime = res.data[i].quitTime.replace(' ','\n')
                        res.data[i].quitEndTime = res.data[i].quitEndTime.replace(' ','\n')
                        res.data[i].bxTime = res.data[i].quitTime.replace(' ','\n')
                        res.data[i].bxEndTime = res.data[i].quitEndTime.replace(' ','\n')
                        if(res.data[i].minCount === -1){
                            res.data[i].minCount = '不限制'
                        }
                    }
                    this.tableData = res.data
                })
            },
            showClassData(index, row){
                this.showTable = true
                this.initClassData(index,row)
                this.checkVisible = true
            },
            initClassData(index, row){
                this.cleanAll()
                this.$set(this, 'gradeList', [{grade: '无数据',btType: ''}]);
                this.$set(this, 'classname', row.name);
                this.$set(this, 'rowData', row);
                let gradeList = []
                for(let i = 0;i < row['academyList'].length;i++) {
                    if (gradeList.indexOf(row['academyList'][i]['grade']) === -1) {
                        this.gradeList.splice(this.gradeList.length,1,{
                            grade: row['academyList'][i]['grade'] + '级',
                            g: row['academyList'][i]['grade'],
                            btType:'',
                        })
                        gradeList.splice(gradeList.length,1,row['academyList'][i]['grade'])
                    }
                }
                if(gradeList.length > 0){
                    this.gradeList.splice(0,1)
                }
                gradeList = ''
            },
            down(index, row){
                this.showTable = false
                this.initClassData(index,row)
                this.checkVisible = true
            },
            getStudentData(){
                if(this.grade === '' || this.college === '' ||
                    this.profession === '' || this.selectClass === '' || this.showTable === false){
                    return
                }
                this.$set(this, 'studentData', []);
                this.$set(this.query, 'pageIndex', 1);
                this.$set(this, 'pageTotal', 0);
                let cid = this.rowData.id
                let aid = ''
                if(this.selectClass !== '0'){
                    for(let i = 0; i < this.rowData.academyList.length; i++){
                        if(this.grade === this.rowData.academyList[i]['grade'] &&
                        this.college === this.rowData.academyList[i]['academy'] &&
                        this.profession === this.rowData.academyList[i]['major'] &&
                        this.selectClass === this.rowData.academyList[i]['sclass']){
                            aid = this.rowData.academyList[i].id
                            break
                        }
                    }
                    if(aid === ''){
                        this.$message.error('未找到该班级数据')
                        return;
                    }
                }

                this.$set(this.query, 'aid', aid);
                this.$set(this.query, 'cid', cid);
                getStudentInformation(this.query.url,this.query.aid,this.query.cid,this.query.pageIndex,this.query.pageSize).then(
                    function(response) {
                        for(let i = 0; i < response['data']['data']['list'].length; i++){
                            response['data']['data']['list'][i]['type'] = this.query.type
                            response['data']['data']['list'][i]['studentIndex'] =
                                response['data']['data']['list'][i]['grade'] + '级' +
                                response['data']['data']['list'][i]['academy'] +
                                response['data']['data']['list'][i]['major'] +
                                response['data']['data']['list'][i]['number'] + '班'
                        }
                        this.$set(this, 'studentData', response['data']['data']['list']);
                        this.$set(this, 'pageTotal', response['data']['data']['total']
                        )
                }.bind(this)).catch(function (error) {
                    console.log(error);
                })


            },
            handlePageChange(val) {
                this.$set(this.query, 'pageIndex', val);
                getStudentInformation(this.query.url,this.query.aid,this.query.cid,this.query.pageIndex,this.query.pageSize).then(
                    function(response) {
                        for(let i = 0; i < response['data']['data']['list'].length; i++){
                            response['data']['data']['list'][i]['type'] = this.query.type
                            response['data']['data']['list'][i]['studentIndex'] =
                                response['data']['data']['list'][i]['grade'] + '级' +
                                response['data']['data']['list'][i]['academy'] +
                                response['data']['data']['list'][i]['major'] +
                                response['data']['data']['list'][i]['number'] + '班'
                        }
                        this.$set(this, 'studentData', response['data']['data']['list']);
                        this.$set(this, 'pageTotal', response['data']['data']['total']
                        )
                    }.bind(this)).catch(function (error) {
                    console.log(error);
                })
            },
            getNowFormatDate() {
                let date = new Date();
                let seperator1 = "-";
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                let currentdate = year + seperator1 + month + seperator1 + strDate;
                return currentdate;
            },
            beginDown(){
                let tid = localStorage.getItem('teacherID')
                let cid = this.rowData.id
                let status = this.query.status
                let name = this.getNowFormatDate() + this.classname + '导出数据'
                let aid = []
                for(let i = 0; i <this.selectList.length; i++){
                    for(let j = 0; j < this.selectList[i].classList.length; j++){
                        for(let k = 0; k < this.rowData.academyList.length; k++){
                            if (this.selectList[i].grade === this.rowData['academyList'][k]['grade'] &&
                                this.selectList[i].college === this.rowData['academyList'][k]['academy']  &&
                                this.selectList[i].profession === this.rowData['academyList'][k]['major']){
                                if(this.selectList[i].classList.length === 1 && this.selectList[i].classList[0] === '0'){
                                    aid.splice(aid.length,1,this.rowData['academyList'][k].id)
                                }else {
                                    if(this.selectList[i].classList[j] === this.rowData.academyList[k]['sclass']){
                                        aid.splice(aid.length,1,this.rowData['academyList'][k].id)
                                    }
                                }
                            }
                        }

                    }
                }
                let data = {
                    aid:aid,
                    cid:cid,
                    tid:tid,
                    status:status,
                    name:name
                }
                DownloadExcel([data]).then(function (response) {
                    console.log(response.data)
                    if(response.data.code === 200){
                        window.location.href=response.data.data[name]
                    }else {
                        this.$message.error('导出失败')
                    }
                }.bind(this)).catch(function (error) {
                    that.$message.error('连接失败')
                })
            },
            handleGrade(item){
                if(item.grade === '无数据'){
                    return
                }
                if(item.btType === ''){
                    this.$set(this, 'collegeList', [{college: '无数据',btType: ''}]);
                    this.$set(this, 'professionList', [{profession: '无数据',btType: ''}]);
                    this.$set(this, 'college', '');
                    this.$set(this, 'profession', '');
                    for(let i = 0; i < this.gradeList.length; i++){
                        this.gradeList[i].btType = ''
                    }
                    item.btType = 'primary'
                    let collegeList = []
                    let grade = item.grade.slice(0,item.grade.length-1)
                    this.$set(this, 'grade', grade);
                    for(let i = 0;i < this.rowData['academyList'].length;i++) {
                        if (grade === this.rowData['academyList'][i]['grade'] &&
                            collegeList.indexOf(this.rowData['academyList'][i]['academy']) === -1) {
                            this.collegeList.splice(this.collegeList.length,1,{
                                college: this.rowData['academyList'][i]['academy'],
                                btType:'',
                            })
                            collegeList.splice(collegeList.length,1,this.rowData['academyList'][i]['academy'])
                        }
                    }
                    if(collegeList.length > 0){
                        this.collegeList.splice(0,1)
                    }
                    collegeList = ''
                    if(this.showTable){
                        this.getStudentData()
                    }
                }
            },
            handleCollege(item){
                if(item.college === '无数据'){
                    return
                }
                if(item.btType === ''){
                    this.$set(this, 'professionList', [{profession: '无数据',btType: ''}]);
                    this.$set(this, 'profession', '');
                    for(let i = 0; i < this.collegeList.length; i++){
                        this.collegeList[i].btType = ''
                    }
                    item.btType = 'primary'
                    let professionList = []
                    let college = item.college
                    this.$set(this, 'college', college);
                    for(let i = 0;i < this.rowData['academyList'].length;i++) {
                        if (this.grade === this.rowData['academyList'][i]['grade'] &&
                            college === this.rowData['academyList'][i]['academy']  &&
                            professionList.indexOf(this.rowData['academyList'][i]['major']) === -1) {
                            let s = this.rowData['academyList'][i]['grade'] +
                                this.rowData['academyList'][i]['academy'] +
                                this.rowData['academyList'][i]['major']
                            let t = ''
                            if(!this.showTable){
                                for(let i = 0; i < this.selectList.length; i++){
                                    if(this.selectList[i].selectData === s){
                                        t = 'primary'
                                    }
                                }
                            }
                            this.professionList.splice(this.professionList.length,1,{
                                selectData: s,
                                btType: t,
                                grade: this.rowData['academyList'][i]['grade'],
                                college : this.rowData['academyList'][i]['academy'],
                                profession: this.rowData['academyList'][i]['major'],
                            })
                            professionList.splice(professionList.length,1,this.rowData['academyList'][i]['major'])
                        }
                    }
                    if(professionList.length > 0){
                        this.professionList.splice(0,1)
                    }
                    professionList = ''
                    if(this.showTable){
                        this.getStudentData()
                    }
                }

            },
            handleProfession(item){
                if(item.profession === '无数据'){
                    return
                }
                if(item.btType === ''){
                    for(let i = 0; i < this.professionList.length; i++){
                        this.professionList[i].btType = ''
                    }
                    item.btType = 'primary'
                    this.$set(this,'profession',item.profession)
                    if(this.showTable){
                        this.getStudentData()
                        return
                    }else {
                        this.createSelect()
                    }
                }

            },
            cleanSelectData(){
                let s = this.grade + this.college + this.profession
                for(let i = this.selectList.length-1; i >= 0; i--){
                    if(s === this.selectList[i].selectData){
                        this.selectList.splice(i,1)
                        break
                    }
                }
                if(this.selectList.length === 0){
                    this.selectList.splice(0,1,{showData: '无数据',selectData: '无数据',btType: ''})
                }
            },
            handleSelect(item){
                if(item.selectData === '无数据'){
                    return
                }
                if(item.btType === ''){
                    for(let i = 0; i < this.selectList.length;i++){
                        this.selectList[i].btType = ''
                    }
                    item.btType = 'primary'
                    this.$set(this, 'grade', item.grade);
                    this.$set(this, 'college', item.college);
                    this.$set(this, 'profession', item.profession);
                    this.synchronizeData(item)
                }
            },
            handleClass(item){
              if(item.btType === ''){
                  if(this.showTable || item.num === '0'){
                      for(let i = 0; i < this.classList.length;i++){
                          this.classList[i].btType = ''
                      }
                  }else if(!this.showTable && item.num !== '0'){
                      this.classList[0].btType = ''
                  }
                  item.btType = 'primary'
                  this.$set(this,'selectClass',item.num)
                  if(this.showTable){
                      this.getStudentData()
                  }
              }else {
                  if(!this.showTable){
                      item.btType = ''
                  }
              }
              if(!this.showTable) {
                  this.createSelect()
              }
            },
            handleType(item){
                if(item.btType === ''){
                    for(let i = 0; i < this.typeList.length;i++){
                        this.typeList[i].btType = ''
                    }
                    item.btType = 'primary'
                    this.$set(this.query, 'type', item.type);
                    this.$set(this.query, 'url', item.url);
                    this.$set(this.query, 'status', item.status);
                    if(this.showTable){
                        this.getStudentData()
                    }
                }
            },
            createSelect(){
                if(this.grade === '' || this.college === '' ||
                    this.profession === '' || this.selectClass === '' || this.showTable){
                    return
                }
                this.cleanSelectData()
                let list = this.checkClassNum()
                if(list.length === 0){
                    return;
                }
                let c = ''
                if(list.length === 1 && list[0] === '0'){
                    c = '全部班级'
                }else {
                    for(let i = 0; i < list.length; i++){
                        c = c + list[i] + '班/'
                    }
                    c = c.substr(0,c.length-1)
                }
                let s = this.grade + this.college + this.profession
                this.selectList.splice(this.selectList.length,1,{
                    showData: s + c,
                    selectData: s,
                    btType:'primary',
                    grade: this.grade,
                    college : this.college,
                    profession: this.profession,
                    classList: list
                })
                for(let i = this.selectList.length -2; i >= 0 ; i--){
                    this.selectList[i].btType = ''
                }
                if(this.selectList.length === 0){
                    this.selectList.splice(0,1,{showData: '无数据',selectData: '无数据',btType: ''})
                }else if(this.selectList.length > 1 && this.selectList[0].selectData === '无数据'){
                    this.selectList.splice(0,1)
                }
            },
            checkClassNum(){
                let classList = []
                for(let i = 0; i < this.classList.length; i++){
                    if(this.classList[i].btType !== ''){
                        classList.splice(classList.length,1,this.classList[i].num)
                    }
                }
                return classList
            },
            synchronizeData(item){
                for(let i = 0; i < this.gradeList.length; i++){
                    if(this.gradeList[i].g === item.grade){
                        this.gradeList[i].btType = 'primary'
                    }else {
                        this.gradeList[i].btType = ''
                    }
                }

                let collegeList = []
                this.$set(this,'collegeList',[])
                for(let i = 0;i < this.rowData['academyList'].length;i++) {
                    if (item.grade === this.rowData['academyList'][i]['grade'] &&
                        collegeList.indexOf(this.rowData['academyList'][i]['academy']) === -1) {
                        if(item.college === this.rowData['academyList'][i]['academy']){
                            this.collegeList.splice(this.collegeList.length,1,{
                                college: this.rowData['academyList'][i]['academy'],
                                btType:'primary',
                            })
                        }else {
                            this.collegeList.splice(this.collegeList.length,1,{
                                college: this.rowData['academyList'][i]['academy'],
                                btType:'',
                            })
                        }
                        collegeList.splice(collegeList.length,1,this.rowData['academyList'][i]['academy'])
                    }
                }
                collegeList = ''

                let professionList = []
                this.$set(this, 'professionList', []);
                for(let i = 0;i < this.rowData['academyList'].length;i++) {
                    if (item.grade === this.rowData['academyList'][i]['grade'] &&
                        item.college === this.rowData['academyList'][i]['academy']  &&
                        professionList.indexOf(this.rowData['academyList'][i]['major']) === -1) {
                        let s = this.rowData['academyList'][i]['grade'] +
                            this.rowData['academyList'][i]['academy'] +
                            this.rowData['academyList'][i]['major']
                        let t = ''
                        if(this.profession === this.rowData['academyList'][i]['major']){
                            t = 'primary'
                        }
                        this.professionList.splice(this.professionList.length,1,{
                            selectData: s,
                            btType: t,
                            grade: this.rowData['academyList'][i]['grade'],
                            college : this.rowData['academyList'][i]['academy'],
                            profession: this.rowData['academyList'][i]['major'],
                        })
                        professionList.splice(professionList.length,1,this.rowData['academyList'][i]['major'])
                    }
                }
                professionList = ''

                for(let i = 0; i < this.classList.length; i++){
                    this.classList[i].btType = ''
                }
                for(let i = 0; i < item.classList.length; i++){
                    for(let j = 0; j < this.classList.length; j++){
                        if(item.classList[i] === this.classList[j].num){
                            this.classList[j].btType = 'primary'
                        }
                    }
                }
            },
            cleanAll(){
                this.$set(this.query, 'pageIndex', 1);
                this.$set(this.query, 'pageSize', 15);
                this.$set(this.query, 'url', 'Selected/ca');
                this.$set(this.query, 'aid', '');
                this.$set(this.query, 'cid', '');
                this.$set(this.query, 'type', '已选');
                this.$set(this.query, 'status', '1');
                this.$set(this, 'pageTotal', 0);
                this.$set(this, 'collegeList', [{college: '无数据',btType: ''}]);
                this.$set(this, 'professionList', [{profession: '无数据',btType: ''}]);
                this.$set(this, 'selectList', [{showData: '无数据',selectData: '无数据',btType: ''}]);
                this.$set(this, 'studentData', []);
                this.$set(this, 'classList', [
                    {class: '全部',btType: '',num: '0'},
                    {class: '一班',btType: '',num: '1'},
                    {class: '二班',btType: '',num: '2'},
                    {class: '三班',btType: '',num: '3'},
                    {class: '四班',btType: '',num: '4'},
                    {class: '五班',btType: '',num: '5'},
                    {class: '六班',btType: '',num: '6'}
                    ]);
                if(this.showTable){
                   this.classList.splice(0,1)
                }
                this.$set(this, 'typeList', [
                    {type: '已选',btType:'primary',url:'Selected/ca','status':'1'},
                    {type: '退选',btType:'',url:'delselected/ca','status':'-1'},
                    {type: '补选',btType:'',url:'bx/ca','status':'0'},
                ]);
                this.$set(this, 'grade', '');
                this.$set(this, 'college', '');
                this.$set(this, 'profession', '');
                this.$set(this, 'selectClass', '');
                for(let i = 0; i < this.gradeList.length; i++){
                    this.gradeList[i].btType = ''
                }
            }
        }
    }

</script>

<style scoped>
    .container{
        height: 90%;
    }
</style>
<style>
    .el-table .cell {
        white-space: pre-line;
    }
</style>
