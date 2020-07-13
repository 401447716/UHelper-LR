<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 发布选课
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <div style="margin-top: 10px">
                    <el-form ref="time" :model="time" label-width="80px">
                        <el-form-item label="选课时间">
                            <el-col style="width: 20%;">
                                <el-date-picker
                                        type="date"
                                        placeholder="选择日期"
                                        v-model="time.selectDate1"
                                        value-format="yyyy-MM-dd"
                                        style="width: 100%;"
                                ></el-date-picker>
                            </el-col>
                            <el-col class="line" style="width: 1.2%;">&nbsp;-&nbsp;</el-col>
                            <el-col style="width: 20%;">
                                <el-time-picker
                                        placeholder="选择时间"
                                        format='HH:mm'
                                        value-format="HH:mm:00"
                                        v-model="time.selectDate2"
                                        style="width: 100%;"
                                ></el-time-picker>
                            </el-col>
                            <el-col style="width: 4%;">&nbsp;</el-col>
                            <el-col style="width: 20%;">
                                <el-date-picker
                                        type="date"
                                        placeholder="选择日期"
                                        v-model="time.selectDate3"
                                        value-format="yyyy-MM-dd"
                                        style="width: 100%;"
                                ></el-date-picker>
                            </el-col>
                            <el-col class="line" style="width: 1.2%;">&nbsp;-&nbsp;</el-col>
                            <el-col style="width: 20%;">
                                <el-time-picker
                                        placeholder="选择时间"
                                        format='HH:mm'
                                        value-format="HH:mm:00"
                                        v-model="time.selectDate4"
                                        style="width: 100%;"
                                ></el-time-picker>
                            </el-col>
                        </el-form-item>

                        <el-form-item label="退选时间">
                            <el-col style="width: 20%;">
                                <el-date-picker
                                        type="date"
                                        placeholder="选择日期"
                                        v-model="time.quitDate1"
                                        value-format="yyyy-MM-dd"
                                        style="width: 100%;"
                                ></el-date-picker>
                            </el-col>
                            <el-col class="line" style="width: 1.2%;">&nbsp;-&nbsp;</el-col>
                            <el-col style="width: 20%;">
                                <el-time-picker
                                        placeholder="选择时间"
                                        format='HH:mm'
                                        value-format="HH:mm:00"
                                        v-model="time.quitDate2"
                                        style="width: 100%;"
                                ></el-time-picker>
                            </el-col>
                            <el-col style="width: 4%;">&nbsp;</el-col>
                            <el-col style="width: 20%;">
                                <el-date-picker
                                        type="date"
                                        placeholder="选择日期"
                                        v-model="time.quitDate3"
                                        value-format="yyyy-MM-dd"
                                        style="width: 100%;"
                                ></el-date-picker>
                            </el-col>
                            <el-col class="line" style="width: 1.2%;">&nbsp;-&nbsp;</el-col>
                            <el-col style="width: 20%;">
                                <el-time-picker
                                        placeholder="选择时间"
                                        format='HH:mm'
                                        value-format="HH:mm:00"
                                        v-model="time.quitDate4"
                                        style="width: 100%;"
                                ></el-time-picker>
                            </el-col>
                        </el-form-item>

                        <el-form-item label="补选时间">
                            <el-col style="width: 20%;">
                                <el-date-picker
                                        type="date"
                                        placeholder="选择日期"
                                        v-model="time.bxDate1"
                                        value-format="yyyy-MM-dd"
                                        style="width: 100%;"
                                ></el-date-picker>
                            </el-col>
                            <el-col class="line" style="width: 1.2%;">&nbsp;-&nbsp;</el-col>
                            <el-col style="width: 20%;">
                                <el-time-picker
                                        placeholder="选择时间"
                                        format='HH:mm'
                                        value-format="HH:mm:00"
                                        v-model="time.bxDate2"
                                        style="width: 100%;"
                                ></el-time-picker>
                            </el-col>
                            <el-col style="width: 4%;">&nbsp;</el-col>
                            <el-col style="width: 20%;">
                                <el-date-picker
                                        type="date"
                                        placeholder="选择日期"
                                        v-model="time.bxDate3"
                                        value-format="yyyy-MM-dd"
                                        style="width: 100%;"
                                ></el-date-picker>
                            </el-col>
                            <el-col class="line" style="width: 1.2%;">&nbsp;-&nbsp;</el-col>
                            <el-col style="width: 20%;">
                                <el-time-picker
                                        placeholder="选择时间"
                                        format='HH:mm'
                                        value-format="HH:mm:00"
                                        v-model="time.bxDate4"
                                        style="width: 100%;"
                                ></el-time-picker>
                            </el-col>
                        </el-form-item>
                    </el-form>
                </div>
                <el-button
                        type="primary"
                        icon="el-icon-delete"
                        class="handle-del mr10"
                        @click="delAllSelection"
                >批量删除</el-button>
            </div>
            <el-table
                    :data="tableData"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" align="center"></el-table-column>
<!--                <el-table-column prop="id" label="ID" align="center"></el-table-column>-->
                <el-table-column prop="classname" label="课程名" align="center"></el-table-column>
                <el-table-column prop="credit" label="学分"align="center"></el-table-column>
                <el-table-column prop="type" label="类型"align="center"></el-table-column>
                <el-table-column prop="grade" label="年级"align="center"></el-table-column>
                <el-table-column prop="college" label="学院"align="center"></el-table-column>
                <el-table-column prop="profession" label="专业"align="center"></el-table-column>
                <el-table-column prop="class" label="班级"align="center"></el-table-column>
                <el-table-column prop="minCount" label="最少选课人数"align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                                type="text"
                                icon="el-icon-delete"
                                class="red"
                                @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="width: 100%;height: 45px;">
                <div class="button_box">
                    <el-button type="primary" icon="el-icon-news" @click="addVisible = true">新增</el-button>
                    <el-button type="primary" icon="el-icon-lx-text" @click="createClass(1)">发布已选</el-button>
                    <el-button type="primary" icon="el-icon-lx-text" @click="createClass(2)">发布全部</el-button>
                </div>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="50%">
            <el-form ref="form" :model="form" label-width="70px">
                <div>
                    <div style="width: 46%; float: left;padding-right: 4%;z-index: 10">
<!--                        <el-form-item label="ID">-->
<!--                            <el-input v-model="form.id"></el-input>-->
<!--                        </el-form-item>-->
                        <el-form-item label="课程名">
                            <el-input v-model="form.classname"></el-input>
                        </el-form-item>
                        <el-form-item label="学分">
                            <el-cascader :options="credit" v-model="form.credit" style="width: 100%"></el-cascader>
                        </el-form-item>
                        <el-form-item label="类型">
                            <el-cascader :options="type" v-model="form.type" style="width: 100%"></el-cascader>
                        </el-form-item>
                        <el-form-item label="最少选课人数">
                            <el-input v-model="form.minCount"></el-input>
                        </el-form-item>
                    </div>
                    <div style="width: 46%; float: right;padding-right: 4%;">
                        <el-form-item label="年级">
                            <el-cascader :options="grade" v-model="form.grade" style="width: 100%"></el-cascader>
                        </el-form-item>
                        <el-form-item label="学院">
                            <el-cascader :options="options" v-model="form.college" style="width: 100%"></el-cascader>
                        </el-form-item>
                        <el-form-item label="专业">
                            <el-input v-model="form.profession"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <el-form-item label="班级" >
                    <el-checkbox-group v-model="form.class">
                        <el-checkbox label="全选" v-model="click" @change="clickAll"></el-checkbox>
                        <el-checkbox v-for="item in classlist" :label="item">{{ item }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="escEdit">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑新增框 -->
        <el-dialog title="新增" :visible.sync="addVisible" width="50%">
            <el-form ref="form" :model="form" label-width="70px">
                <div>
                    <div style="width: 46%; float: left;padding-right: 4%;z-index: 10">
<!--                        <el-form-item label="ID">-->
<!--                            <el-input v-model="form.id"></el-input>-->
<!--                        </el-form-item>-->
                        <el-form-item label="课程名">
                            <el-input v-model="form.classname"></el-input>
                        </el-form-item>
                        <el-form-item label="学分">
                            <el-cascader :options="credit" v-model="form.credit" style="width: 100%"></el-cascader>
                        </el-form-item>
                        <el-form-item label="类型">
                            <el-cascader :options="type" v-model="form.type" style="width: 100%"></el-cascader>
                        </el-form-item>
                        <el-form-item label="最少人数">
                            <el-input v-model="form.minCount"></el-input>
                        </el-form-item>
                    </div>
                    <div style="width: 46%; float: right;padding-right: 4%;">
                        <el-form-item label="年级">
                            <el-cascader :options="grade" v-model="form.grade" style="width: 100%"></el-cascader>
                        </el-form-item>
                        <el-form-item label="学院">
                            <el-cascader :options="options" v-model="form.college" style="width: 100%"></el-cascader>
                        </el-form-item>
                        <el-form-item label="专业">
                            <el-input v-model="form.profession"></el-input>
                        </el-form-item>
                        <el-form-item label=" " style="visibility: hidden">
                            <el-input></el-input>
                        </el-form-item>
                    </div>
                </div>
                <el-form-item label="班级">
                    <el-checkbox-group v-model="form.class">    <!--    style="width: 42%;float: right"-->
                        <el-checkbox label="全选" v-model="click" @change="clickAll" style="margin-right: 25px"></el-checkbox>
                        <el-checkbox v-for="item in classlist" :label="item">{{ item }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <div v-if="showTags" class="tag_box">
                <div v-for="(item,index) in tagsList" style="margin-left: 5%">
                    <li class="tag-li">
                        <label class="tags-li-title">
                            {{item.keSelected}}
                        </label>
                        <span class="tags-li-icon" @click="closeTags(index)" style="float: right"><i class="el-icon-close"></i></span>
                    </li>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="setTags">新 增</el-button>
                <el-button @click="escAdd">取 消</el-button>
                <el-button type="primary" @click="addEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {postCourseSelectionInformation} from "../../api";

    export default {
        name: "CreateSelect",
        data() {
            return {
                tableData: [],
                multipleSelection: [],
                delList: [],
                editVisible: false,
                addVisible:false,
                pageTotal: 0,
                click:false,
                tagsList: [],
                time:{
                    selectDate1:'',
                    selectDate2:'12:00:00',
                    selectDate3:'',
                    selectDate4:'12:00:00',
                    quitDate1:'',
                    quitDate2:'12:00:00',
                    quitDate3:'',
                    quitDate4:'12:00:00',
                    bxDate1:'',
                    bxDate2:'12:00:00',
                    bxDate3:'',
                    bxDate4:'12:00:00',
                },
                form: {
                    // id:'',
                    classname:'',
                    credit:'',
                    type:'',
                    grade:'',
                    college:'',
                    profession:'',
                    class: [],
                    minCount: ''
                },
                credit:[
                    {
                        value: 0.5,
                        label: 0.5
                    },
                    {
                        value: 1.0,
                        label: 1.0
                    },
                    {
                        value: 1.5,
                        label: 1.5
                    },
                    {
                        value: 2.0,
                        label: 2.0
                    },
                    {
                        value: 2.5,
                        label: 2.5
                    },
                    {
                        value: 3.0,
                        label: 3.0
                    },
                    {
                        value: 3.5,
                        label: 3.5
                    },
                    {
                        value: 4.0,
                        label: 4.0
                    },
                    {
                        value: 4.5,
                        label: 4.5
                    },
                    {
                        value: 5.0,
                        label: 5.0
                    },
                    {
                        value: 5.5,
                        label: 5.5
                    },
                    {
                        value: 6.0,
                        label: 6.0
                    }
                ],
                type:[
                    {
                        value: '必修',
                        label:'必修'
                    },
                    {
                        value: '选修',
                        label:'选修'
                    },
                    {
                        value: '公共基础课',
                        label:'公共基础课'
                    },
                    {
                        value: '学科基础课',
                        label:'学科基础课'
                    },
                    {
                        value: '专业领域课',
                        label:'专业领域课'
                    },
                    {
                        value: '集中实践环节',
                        label:'集中实践环节'
                    },
                    {
                        value: '个人拓展计划',
                        label:'个人拓展计划'
                    },
                ],
                grade :[],
                classlist:['1班','2班','3班','4班','5班','6班'],
                options:[
                    {
                        value: '汽车与交通工程学院',
                        label: '汽车与交通工程学院',
                    },
                    {
                        value: '机械工程学院',
                        label: '机械工程学院',
                    },
                    {
                        value: '机器人工程学院',
                        label: '机器人工程学院',
                    },
                    {
                        value: '电子信息工程学院',
                        label: '电子信息工程学院',
                    },
                    {
                        value: '通信工程学院',
                        label: '通信工程学院',
                    },
                    {
                        value: '电气工程学院',
                        label: '电气工程学院',
                    },
                    {
                        value: '计算机工程学院',
                        label: '计算机工程学院',
                    },
                    {
                        value: '大数据学院',
                        label: '大数据学院',
                    },
                    {
                        value: '管理学院',
                        label: '管理学院',
                    },
                    {
                        value: '创新创业教育学院',
                        label: '创新创业教育学院',
                    },
                    {
                        value: '经济学院',
                        label: '经济学院',
                    },
                    {
                        value: '外国语学院',
                        label: '外国语学院',
                    },
                    {
                        value: '珠宝学院',
                        label: '珠宝学院',
                    },
                    {
                        value: '建筑学院',
                        label: '建筑学院',
                    },
                    {
                        value: '土木工程学院',
                        label: '土木工程学院',
                    },
                    {
                        value: '国际商学院',
                        label: '国际商学院',
                    },
                    {
                        value: '马克思主义学院',
                        label: '马克思主义学院',
                    },
                    {
                        value: '体育部',
                        label: '体育部',
                    },
                ],
                idx: -1,
                id: -1,
                tag:[],
            };
        },
        created() {
            this.getData();
        },
        computed: {
            showTags() {
                return this.tagsList.length > 0;
            }
        },

        methods: {
            getData() {
                let Data = new Date()
                for(let i = 0; i <= 5; i++){
                    let time = {
                        value: Data.getFullYear()-i + '级',
                        label: Data.getFullYear()-i + '级',
                    }
                    this.grade.splice(this.grade.length,1,time)
                }
            },



            // 关闭单个标签
            closeTags(index) {
                const delItem = this.tagsList.splice(index, 1)[0];
                const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];
                if (item) {
                    delItem.path === this.$route.fullPath && this.$router.push(item.path);
                }
            },
            // 设置标签
            setTags(){
                let classData = this.form.class
                let classdata = ''
                let i = 0
                if((i = classData.indexOf('全选'))!==-1){
                    classData.splice(i,1)
                }
                for(let j = 0; j <classData.length; j++){
                    classdata = classdata + classData[j] + '/'
                }
                classdata = classdata.slice(0,classdata.length-1)
                let data = {
                    // id:this.form.id,
                    classname:this.form.classname,
                    credit:this.form.credit,
                    type:this.form.type,
                    grade:this.form.grade,
                    college:this.form.college,
                    profession:this.form.profession,
                    class:this.form.class,
                    minCount: this.form.minCount,
                    keSelected:('课程名: '+ this.form.classname + '   ' + this.form.grade + this.form.college +this.form.profession + '专业' + classdata)
                }
                for (let key in data) {
                    if(data[key] == ''){
                        this.$message.error('缺失数据');
                        return
                    }
                }
                if(this.tag.indexOf(data.keSelected) === -1){
                    this.tagsList.push(data)
                    this.tag.push(data.keSelected + '  最少选课人数：' + data.minCount)
                    this.form={
                        // id:'',
                        classname:this.form.classname,
                        credit:this.form.credit,
                        type:this.form.type,
                        grade:'',
                        college:'',
                        profession:'',
                        class: [],
                        minCount: ''
                    }
                }else{
                    this.$message.error('已有相同选课信息');
                }

            },











            // 删除操作
            handleDelete(index, row) {
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        this.$message.success('删除成功');
                        this.tableData.splice(index, 1);
                    })
                    .catch(() => {});
            },
            // 多选操作
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            delAllSelection() {
                const length = this.multipleSelection.length;
                let str = '';

                for(let i = 0; i < this.multipleSelection.length;i++){
                    let j = this.tableData.indexOf(this.multipleSelection[i])
                    this.tableData.splice(j,1)
                }
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].classname + ' ';
                }
                this.$message.success(`删除了${str}`);
                this.multipleSelection = [];

            },
            // 编辑操作
            handleEdit(index, row) {
                this.idx = index;
                this.form = JSON.parse(JSON.stringify(row));
                if(this.form.class.length == this.classlist.length + 1){
                    let list = new Array()
                    for(let i = 0; i < this.classlist.length; i++){
                        list[i] = this.classlist[i]
                    }
                    list[list.length] = '全选'
                    this.form.class = list
                }
                this.editVisible = true;
            },
            escEdit(){
                if(this.form.class.length == this.classlist.length + 1){
                    this.form.class = this.classlist
                }
                this.form = {
                    // id:'',
                    classname:'',
                    credit:'',
                    type:'',
                    grade:'',
                    college:'',
                    profession:'',
                    class:[],
                    minCount: ''
                }
                this.editVisible = false
            },
            escAdd(){
                this.form = {
                    // id:'',
                    classname:'',
                    credit:'',
                    type:'',
                    grade:'',
                    college:'',
                    profession:'',
                    class:[],
                    minCount: ''
                }
                this.tagsList = []
                this.tag = []
                this.addVisible = false
            },
            //新增操作
            addEdit(){
                let classData = {
                    // id:this.form.id,
                    classname:this.form.classname,
                    credit:this.form.credit,
                    type:this.form.type,
                    grade:this.form.grade,
                    college:this.form.college,
                    profession:this.form.profession,
                    class:this.form.class,
                    minCount: ''
                }
                // let idList = []
                // let errorData = '';
                // for(let i = 0;i<this.tableData.length;i++){
                //     idList[i] = this.tableData[i].id
                // }
                if(classData.profession !== ''){
                    for (let key in classData) {
                        if(classData[key] == ''){
                            this.$message.error('缺失数据');
                            return
                        }
                    }
                    if(classData.class.length == this.classlist.length + 1){
                        classData.class = this.classlist
                    }
                    // if(idList.indexOf(classData.id) === -1){
                        this.tableData.splice(this.tableData.length,1,JSON.parse(JSON.stringify(classData)))
                    // }else{
                    //     errorData += errorData + classData.id + ','
                    // }
                }
                if(this.tagsList.length > 0){
                    for(let i = 0; i < this.tagsList.length;i++){
                        // if(idList.indexOf(this.tagsList[i].id) === -1){
                            this.tableData.splice(this.tableData.length,1,JSON.parse(JSON.stringify(this.tagsList[i])))
                        // }else{
                        //     errorData += errorData + this.tagsList[i].id + ','
                        // }
                    }
                }
                this.form = {
                    // id:'',
                    classname:'',
                    credit:'',
                    type:'',
                    grade:'',
                    college:'',
                    profession:'',
                    class:[],
                    minCount: ''
                }
                this.tag = []
                this.tagsList = []
                // if(errorData !== ''){
                //     errorData = errorData.slice(0,errorData.length-1)
                //     this.$message.error('课程ID为' + errorData + '课程已存在');
                // }
                this.addVisible = false
            },
            // 保存编辑
            saveEdit() {
                this.editVisible = false;
                if(this.form.class.length == this.classlist.length + 1){
                    this.form.class = this.classlist
                }
                this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                this.$set(this.tableData, this.idx, JSON.parse(JSON.stringify(this.form)));
                this.form = {
                    // id:'',
                    classname:'',
                    credit:'',
                    type:'',
                    grade:'',
                    college:'',
                    profession:'',
                    class:[],
                    minCount: ''
                }
            },
            // 分页导航
            handlePageChange(val) {
                this.$set(this.query, 'pageIndex', val);
                this.getData();
            },
            clickAll(val){
                if(val){
                    let list = new Array()
                    for(let i = 0; i < this.classlist.length; i++){
                        list[i] = this.classlist[i]
                    }
                    list[list.length] = '全选'
                    this.form.class = list
                }else{
                    this.form.class = []
                }
            },
            createClass(i){
                let tableData2 = []
                let classData = []
                let college_profession = []
                let that = this
                if(i === 1){
                    tableData2 = this.multipleSelection
                }else if(i === 2){
                    tableData2 = this.tableData
                }
                for (let key in this.time) {
                    if(this.time[key] == ''){
                        this.$message.error('选课/退选/补选时间未填写完全');
                        return
                    }
                }
                if(this.compareDate(this.time.selectDate1,this.time.selectDate3)){
                    this.$message.error('选课开始日期请大于结束日期');
                    return
                }
                if(this.compareDate(this.time.quitDate1,this.time.quitDate3)){
                    this.$message.error('退选开始日期请大于结束日期');
                    return
                }
                if(this.compareDate(this.time.bxDate1,this.time.bxDate3)){
                    this.$message.error('补选开始日期请大于结束日期');
                    return
                }
                for(let i = 0 ; i < tableData2.length ; i++){
                    let classData = tableData2[i].class
                    let classdata = ''
                    for(let j = 0; j <classData.length; j++){
                        classdata = classdata + classData[j] + '/'
                    }
                    classdata = classdata.slice(0,classdata.length-1)
                    college_profession[i] = (tableData2[i].grade + tableData2[i].college + tableData2[i].profession + '专业' + classdata)
                }
                for(let i = 0;i<tableData2.length;i++){
                    let classdata = {
                        //id:this.tableData[i].id,
                        bxTime :this.time.bxDate1 + ' ' + this.time.bxDate2,
                        bxEndTime :this.time.bxDate3 + ' ' + this.time.bxDate4,
                        minCount :tableData2[i].minCount,
                        name :tableData2[i].classname,
                        credit:tableData2[i].credit[0],
                        teacherC:localStorage.getItem('teacherID'),
                        type:tableData2[i].type[0],
                        keSelected:college_profession[i],
                        selectTime:this.time.selectDate1 + ' ' + this.time.selectDate2,
                        selectEndTime:this.time.selectDate3 + ' ' + this.time.selectDate4,
                        quitTime: this.time.quitDate1 + ' ' + this.time.quitDate2,
                        quitEndTime: this.time.quitDate3 + ' ' + this.time.quitDate4,
                    }
                    classData.push(classdata)
                }
                console.log(classData)
                postCourseSelectionInformation(classData).then(function (response) {
                    console.log(response)
                    if (response['data'].msg === '成功') {
                        that.$message.success('发布成功');
                        if(i === 2){
                            that.$set(that, 'tableData', []);
                        }else{
                            for(let i = 0; i < that.multipleSelection.length;i++){
                                let j = that.tableData.indexOf(that.multipleSelection[i])
                                that.tableData.splice(j,1)
                            }
                            that.multipleSelection = []
                        }
                    }
                }.bind(this)).catch(function (error) {
                    that.$message.error('发布失败')
                })
            },
            compareDate(s1,s2){
                return ((new Date(s1.replace(/-/g,"\/")))>=(new Date(s2.replace(/-/g,"\/"))));
            }
        }
    }
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .table {
        width: 100%;
        font-size: 14px;
    }
    .red {
        color: #ff0000;
    }
    .mr10 {
        margin-right: 10px;
    }
    .table-td-thumb {
        display: block;
        margin: auto;
        width: 40px;
        height: 40px;
    }
    .button_box{
        margin-top: 20px;
        float: right;
    }
    .el-input.el-input--small {
        z-index: 10;
    }
    .el-cascader.el-cascader--small {
        z-index: 10;
    }

    .tags ul {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
    }

    .tag-li {
        width: 85%;
        margin: 3px 5px 2px 3px;
        border-radius: 3px;
        font-size: 12px;
        overflow: hidden;
        cursor: pointer;
        height: 23px;
        line-height: 23px;
        border: 1px solid #e9eaec;
        background: #fff;
        padding: 0 5px 0 12px;
        vertical-align: middle;
        color: #666;
        -webkit-transition: all .3s ease-in;
        -moz-transition: all .3s ease-in;
        transition: all .3s ease-in;
    }

    .tags-li:not(.active):hover {
        background: #f8f8f8;
    }

    .tags-li.active {
        color: #fff;
    }

    .tags-li-title {
        float: left;
        max-width: 80%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 5px;
        color: #666;
    }

    .tags-li.active .tags-li-title {
        color: #fff;
    }

    .tags-close-box {
        position: absolute;
        right: 0;
        top: 0;
        box-sizing: border-box;
        padding-top: 1px;
        text-align: center;
        width: 110px;
        height: 30px;
        background: #fff;
        box-shadow: -3px 0 15px 3px rgba(0, 0, 0, .1);
        z-index: 10;
    }
    .tag_box{
        max-height: 150px;
        overflow: auto;
    }
    .tag_box::-webkit-scrollbar {/*滚动条整体样式*/
        width: 7px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
    }
    .tag_box::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 2px rgba(0,0,0,0.2);
        background: #2d8cf0;
    }
    .tag_box::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 2px rgba(0,0,0,0.2);
        border-radius: 10px;
        background: #E4E7ED;
    }
</style>