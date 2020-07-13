<template>
    <div style="height: 90%">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 修改选课
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="leftBox">
                <el-table
                        :data="tableData"
                        border
                        class="table"
                        ref="multipleTable"
                        header-cell-class-name="table-header"
                        style="width: 96%"
                        @row-click="showClassData"
                >
                    <el-table-column prop="selectTime" label="选课开始时间" align="center"></el-table-column>
                    <el-table-column prop="selectEndTime" label="选课结束时间" align="center"></el-table-column>
                    <el-table-column prop="quitTime" label="退选开始时间" align="center"></el-table-column>
                    <el-table-column prop="quitEndTime" label="退选结束时间" align="center"></el-table-column>
                    <el-table-column prop="name" label="课程名" align="center"></el-table-column>
                </el-table>
            </div>
            <div class="rightBox">
                <div style="text-align: center;margin-bottom: 4%;"><label>详细信息</label></div>
                <el-form ref="form" :model="form" label-width="70px">
                    <div>
                        <div style="width: 46%; float: left;padding-right: 4%;z-index: 10">
                            <el-form-item label="课程名">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="学分">
                                <el-input v-model="form.credit"></el-input>
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
                                <el-cascader :props="props" :options="grade" v-model="form.grade" class="select-z" @change="changeSelect"></el-cascader>
                            </el-form-item>
                            <el-form-item label="学院">
                                <el-cascader :props="props" :options="college" v-model="form.college" class="select-z" @change="changeSelect"></el-cascader>
                            </el-form-item>
                            <el-form-item label="专业">
                                <el-cascader :props="props" :options="profession" v-model="form.profession" class="select-z" @change="changeProfession"></el-cascader>
                            </el-form-item>
                            <el-form-item label="" style="visibility: hidden">
                                <el-input></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div style="float: left;width: 100%;margin-bottom: 4%">
                        <label style="padding-left: 4%;font-size: 14px;line-height: 32px;float: left">班级</label>
                        <el-form-item v-for="(items,i) in classList">
                            <el-checkbox-group v-model="items.list">
                                <el-checkbox v-for="item in classlist" :label="item">{{ item }}</el-checkbox>
                            </el-checkbox-group>
                            <label class="classItem">{{items.name}}</label>
                        </el-form-item>
                    </div>
                    <el-button type="primary" style="float: left;margin-left: 4%" @click="del">删除所选课程</el-button>
                    <el-button type="primary" style="float: left;margin-left: 4%" @click="add">添加课程信息</el-button>
                    <el-button type="primary" style="float: right;margin-right: 4%" @click="updateClass">保存修改</el-button>
                    <el-button type="primary" style="float: right;margin-right: 4%" @click="editVisible = true">修改选课/退选时间</el-button>
                </el-form>
            </div>
        </div>
<!--        时间修改框-->
        <el-dialog title="编辑选课/退选时间" :visible.sync="editVisible" width="65%">
            <el-form ref="time2" :model="time2" label-width="80px" style="margin-left: 7%">
                <el-form-item label="选课时间">
                    <el-col style="width: 20%;">
                        <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="time2.selectDate1"
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
                                v-model="time2.selectDate2"
                                style="width: 100%;"
                        ></el-time-picker>
                    </el-col>
                    <el-col style="width: 4%;">&nbsp;</el-col>
                    <el-col style="width: 20%;">
                        <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="time2.selectDate3"
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
                                v-model="time2.selectDate4"
                                style="width: 100%;"
                        ></el-time-picker>
                    </el-col>

                </el-form-item>
                <el-form-item label="退选时间">
                    <el-col style="width: 20%;">
                        <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="time2.quitDate1"
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
                                v-model="time2.quitDate2"
                                style="width: 100%;"
                        ></el-time-picker>
                    </el-col>
                    <el-col style="width: 4%;">&nbsp;</el-col>
                    <el-col style="width: 20%;">
                        <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="time2.quitDate3"
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
                                v-model="time2.quitDate4"
                                style="width: 100%;"
                        ></el-time-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="补选时间">
                    <el-col style="width: 20%;">
                        <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="time2.bxDate1"
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
                                v-model="time2.bxDate2"
                                style="width: 100%;"
                        ></el-time-picker>
                    </el-col>
                    <el-col style="width: 4%;">&nbsp;</el-col>
                    <el-col style="width: 20%;">
                        <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="time2.bxDate3"
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
                                v-model="time2.bxDate4"
                                style="width: 100%;"
                        ></el-time-picker>
                    </el-col>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="escChangeTime">取 消</el-button>
                <el-button type="primary" @click="ChangeTime">确 定</el-button>
            </span>
        </el-dialog>
<!--        检查修改信息-->
        <el-dialog title="选课修改确认" :visible.sync="checkVisible" width="70%">
            <div class="container" style="padding-bottom: 7%">
                <el-form ref="form3" :model="form3" label-width="70px">
                    <el-form ref="time2" :model="time2" label-width="80px" style="margin-left: 5%;pointer-events: none">
                        <el-form-item label="选课时间">
                            <el-col style="width: 20%;">
                                <el-date-picker
                                        type="date"
                                        placeholder="选择日期"
                                        v-model="time2.selectDate1"
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
                                        v-model="time2.selectDate2"
                                        style="width: 100%;"
                                ></el-time-picker>
                            </el-col>
                            <el-col style="width: 4%;">&nbsp;</el-col>
                            <el-col style="width: 20%;">
                                <el-date-picker
                                        type="date"
                                        placeholder="选择日期"
                                        v-model="time2.selectDate3"
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
                                        v-model="time2.selectDate4"
                                        style="width: 100%;"
                                ></el-time-picker>
                            </el-col>

                        </el-form-item>
                        <el-form-item label="退选时间">
                            <el-col style="width: 20%;">
                                <el-date-picker
                                        type="date"
                                        placeholder="选择日期"
                                        v-model="time2.quitDate1"
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
                                        v-model="time2.quitDate2"
                                        style="width: 100%;"
                                ></el-time-picker>
                            </el-col>
                            <el-col style="width: 4%;">&nbsp;</el-col>
                            <el-col style="width: 20%;">
                                <el-date-picker
                                        type="date"
                                        placeholder="选择日期"
                                        v-model="time2.quitDate3"
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
                                        v-model="time2.quitDate4"
                                        style="width: 100%;"
                                ></el-time-picker>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="补选时间">
                            <el-col style="width: 20%;">
                                <el-date-picker
                                        type="date"
                                        placeholder="选择日期"
                                        v-model="time2.bxDate1"
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
                                        v-model="time2.bxDate2"
                                        style="width: 100%;"
                                ></el-time-picker>
                            </el-col>
                            <el-col style="width: 4%;">&nbsp;</el-col>
                            <el-col style="width: 20%;">
                                <el-date-picker
                                        type="date"
                                        placeholder="选择日期"
                                        v-model="time2.bxDate3"
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
                                        v-model="time2.bxDate4"
                                        style="width: 100%;"
                                ></el-time-picker>
                            </el-col>
                        </el-form-item>
                    </el-form>
                    <div style="width: 70%;margin: 0 auto;overflow:hidden">
                        <div style="width: 46%; float: left;padding-right: 4%;z-index: 10">
                            <el-form-item label="课程名">
                                <el-input v-model="form3.name"></el-input>
                            </el-form-item>
                            <el-form-item label="学分">
                                <el-input v-model="form3.credit"></el-input>
                            </el-form-item>
                            <el-form-item label="类型">
                                <el-input v-model="form3.type"></el-input>
                            </el-form-item>
                            <el-form-item label="最少人数">
                                <el-input v-model="form3.minCount"></el-input>
                            </el-form-item>
                        </div>
                        <div style="width: 46%; float: right;padding-right: 4%;">
                            <el-form-item label="年级">
                                <el-cascader :props="props" :options="grade" v-model="form3.grade" class="select-z-2"></el-cascader>
                            </el-form-item>
                            <el-form-item label="学院">
                                <el-cascader :props="props" :options="college" v-model="form3.college" class="select-z-2"></el-cascader>
                            </el-form-item>
                            <el-form-item label="专业">
                                <el-cascader :props="props" :options="profession" v-model="form3.profession" class="select-z-2"></el-cascader>
                            </el-form-item>
                            <el-form-item label=" " style="visibility: hidden">
                                <el-input></el-input>
                            </el-form-item>
                        </div>
                        <div style="float: left;width: 100%;margin-bottom: 4%">
                            <label style="padding-left: 4%;font-size: 14px;line-height: 32px;float: left">班级</label>
                            <el-form-item v-for="(items,i) in classList">
                                <el-checkbox-group v-model="items.list">
                                    <el-checkbox v-for="item in classlist" :label="item">{{ item }}</el-checkbox>
                                </el-checkbox-group>
                                <label class="classItem">{{items.name}}</label>
                            </el-form-item>
                        </div>

                    </div>
                </el-form>
                <div style="float: right">
                    <el-button @click="checkVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </div>
            </div>
        </el-dialog>

        <!--        添加课程信息-->
        <el-dialog title="添加课程信息" :visible.sync="addVisible" width="70%">
            <div class="container" style="padding-bottom: 7%">
                <el-form ref="form2" :model="form2" label-width="70px">
                    <el-form ref="time2" :model="time2" label-width="80px" style="margin-left: 5%;pointer-events: none">
                        <el-form-item label="选课时间">
                            <el-col style="width: 20%;">
                                <el-date-picker
                                        type="date"
                                        placeholder="选择日期"
                                        v-model="time2.selectDate1"
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
                                        v-model="time2.selectDate2"
                                        style="width: 100%;"
                                ></el-time-picker>
                            </el-col>
                            <el-col style="width: 4%;">&nbsp;</el-col>
                            <el-col style="width: 20%;">
                                <el-date-picker
                                        type="date"
                                        placeholder="选择日期"
                                        v-model="time2.selectDate3"
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
                                        v-model="time2.selectDate4"
                                        style="width: 100%;"
                                ></el-time-picker>
                            </el-col>

                        </el-form-item>
                        <el-form-item label="退选时间">
                            <el-col style="width: 20%;">
                                <el-date-picker
                                        type="date"
                                        placeholder="选择日期"
                                        v-model="time2.quitDate1"
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
                                        v-model="time2.quitDate2"
                                        style="width: 100%;"
                                ></el-time-picker>
                            </el-col>
                            <el-col style="width: 4%;">&nbsp;</el-col>
                            <el-col style="width: 20%;">
                                <el-date-picker
                                        type="date"
                                        placeholder="选择日期"
                                        v-model="time2.quitDate3"
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
                                        v-model="time2.quitDate4"
                                        style="width: 100%;"
                                ></el-time-picker>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="补选时间">
                            <el-col style="width: 20%;">
                                <el-date-picker
                                        type="date"
                                        placeholder="选择日期"
                                        v-model="time2.bxDate1"
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
                                        v-model="time2.bxDate2"
                                        style="width: 100%;"
                                ></el-time-picker>
                            </el-col>
                            <el-col style="width: 4%;">&nbsp;</el-col>
                            <el-col style="width: 20%;">
                                <el-date-picker
                                        type="date"
                                        placeholder="选择日期"
                                        v-model="time2.bxDate3"
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
                                        v-model="time2.bxDate4"
                                        style="width: 100%;"
                                ></el-time-picker>
                            </el-col>
                        </el-form-item>
                    </el-form>
                    <div style="width: 70%;margin: 0 auto;overflow:hidden">
                        <div style="width: 46%; float: left;padding-right: 4%;z-index: 10">
                            <el-form-item label="课程名">
                                <el-input v-model="form2.name"></el-input>
                            </el-form-item>
                            <el-form-item label="学分">
                                <el-input v-model="form2.credit"></el-input>
                            </el-form-item>
                            <el-form-item label="类型">
                                <el-input v-model="form2.type"></el-input>
                            </el-form-item>
                            <el-form-item label="最少人数">
                                <el-input v-model="form2.minCount"></el-input>
                            </el-form-item>
                        </div>
                        <div style="width: 46%; float: right;padding-right: 4%;">
                            <el-form-item label="年级">
                                <el-cascader :options="grade2" v-model="form2.grade" class="select-z"></el-cascader>
                            </el-form-item>
                            <el-form-item label="学院">
                                <el-cascader :options="options" v-model="form2.college" class="select-z"></el-cascader>
                            </el-form-item>
                            <el-form-item label="专业">
                                <el-input v-model="form2.profession" class="select-z"></el-input>
                            </el-form-item>
                            <el-form-item label=" " style="visibility: hidden">
                                <el-input></el-input>
                            </el-form-item>
                        </div>
                        <el-form-item label="班级">
                            <el-checkbox-group v-model="form2.class">    <!--    style="width: 42%;float: right"-->
                                <el-checkbox label="全选" v-model="click" @change="clickAll" style="margin-right: 25px"></el-checkbox>
                                <el-checkbox v-for="item in classlist" :label="item">{{ item }}</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>

                    </div>
                </el-form>
                <div style="float: right">
                    <el-button @click="addVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveadd">确 定</el-button>
                </div>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    import {
        deleteCourseInformation,
        getCourseInformation,
        postCourseSelectionInformation,
    } from "../../api";

    export default {
        name: "ModifyClass",
        data() {
            return {
                tableData:[],
                ID: localStorage.getItem('teacherID'),
                form: {
                    name:'',
                    credit:'',
                    type:'',
                    grade:[],
                    college:[],
                    profession:[],
                    academyList:[],
                    id:'',
                    minCount:''
                },
                form2: {
                    name:'',
                    credit:'',
                    type:'',
                    grade:[],
                    college:[],
                    profession:[],
                    class: [],
                    id:''
                },
                form3: {
                    name:'',
                    credit:'',
                    type:'',
                    grade:[],
                    college:[],
                    profession:[],
                    id:''
                },
                time:{
                    selectDate1:'',
                    selectDate2:'',
                    selectDate3:'',
                    selectDate4:'',
                    quitDate1:'',
                    quitDate2:'',
                    quitDate3:'',
                    quitDate4:'',
                    bxDate1:'',
                    bxDate2:'',
                    bxDate3:'',
                    bxDate4:'',
                },
                time2:{
                    selectDate1:'',
                    selectDate2:'',
                    selectDate3:'',
                    selectDate4:'',
                    quitDate1:'',
                    quitDate2:'',
                    quitDate3:'',
                    quitDate4:'',
                    bxDate1:'',
                    bxDate2:'',
                    bxDate3:'',
                    bxDate4:'',
                },
                props: {
                    multiple: true
                },
                checkList:[],
                grade:[],
                college:[],
                profession:[],
                classlist:['1班','2班','3班','4班','5班','6班'],
                classList: [],
                classData:[],
                grade2:[],
                editVisible:false,
                checkVisible:false,
                professionVisible: false,
                addVisible:false,
                click:false,
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
                    }
                    this.tableData = res.data
                })
                let Data = new Date()
                for(let i = 0; i <= 5; i++){
                    let time = {
                        value: Data.getFullYear()-i + '级',
                        label: Data.getFullYear()-i + '级',
                    }
                    this.grade2.splice(this.grade2.length,1,time)
                }
            },
            showClassData(row){
                console.log(row)
                this.form = {
                    name:row.name,
                    credit:row.credit,
                    type:row.type,
                    grade:[],
                    college:[],
                    profession:[],
                    academyList:row['academyList'],
                    id:row['id'],
                    minCount: row.minCount
                }
                this.form2 = {
                    name:'',
                    credit:'',
                    type:[],
                    grade:[],
                    college:[],
                    profession:[],
                    class: [],
                    id:row['id'],
                    minCount: ''
                }
                this.form3 = {
                    name:'',
                    credit:'',
                    type:[],
                    grade:[],
                    college:[],
                    profession:[],
                    id:row['id'],
                    minCount: ''
                }
                this.time2 = {
                    selectDate1:row['selectTime'].substr(0,10),
                    selectDate2:row['selectTime'].substr(11,row['selectTime'].length),
                    selectDate3:row['selectEndTime'].substr(0,10),
                    selectDate4:row['selectEndTime'].substr(11,row['selectEndTime'].length),
                    quitDate1:row['quitTime'].substr(0,10),
                    quitDate2:row['quitTime'].substr(11,row['quitTime'].length),
                    quitDate3:row['quitEndTime'].substr(0,10),
                    quitDate4:row['quitEndTime'].substr(11,row['quitEndTime'].length),
                    bxDate1:row['bxTime'].substr(0,10),
                    bxDate2:row['bxTime'].substr(11,row['bxTime'].length),
                    bxDate3:row['bxEndTime'].substr(0,10),
                    bxDate4:row['bxEndTime'].substr(11,row['bxEndTime'].length),
                }
                this.time = JSON.parse(JSON.stringify(this.time2))
                this.grade = []
                this.college = []
                this.profession = []
                this.classlist = ['1班','2班','3班','4班','5班','6班']
                this.classList = [{
                    name: "",
                    list: []
                }]
                if(row['academyList'].length === 0){
                    return
                }
                let gradeList = []
                for(let i = 0;i < row['academyList'].length;i++) {
                    if (gradeList.indexOf(row['academyList'][i]['grade']) === -1) {
                        this.grade.splice(this.grade.length,1,{
                            value: row['academyList'][i]['grade'] + '级',
                            label: row['academyList'][i]['grade'] + '级'
                        })
                        gradeList.splice(gradeList.length,1,row['academyList'][i]['grade'])
                    }
                }
                gradeList = ''
            },
            changeSelect(val){
                let haveGrade = !(typeof(this.form.grade[0]) == 'undefined')
                let haveCollege = !(typeof(this.form.college[0]) == 'undefined')
                if(haveGrade && haveCollege){
                    for(let i = 0; i < this.form.academyList.length; i++){
                        for(let j = 0; j<this.form.grade.length;j++){
                            for(let k = 0; k < this.form.college.length;k++){
                                if((this.form.academyList[i].grade + '级') === this.form.grade[j][0] &&
                                    (this.form.academyList[i].academy) === this.form.college[k][0]){
                                    let str = this.form.grade[j][0] + '/' + this.form.college[k][0] + '/' + this.form.academyList[i].major
                                    if(!this.checkObject(this.profession,str)){
                                        this.profession.splice(this.profession.length,1,{
                                            value: str,
                                            label: str
                                        })
                                    }
                                }
                            }
                        }

                    }
                }else if(haveGrade){
                    for(let i = 0; i < this.form.academyList.length; i++){
                        for(let j = 0;j < this.form.grade.length; j++){
                            if((this.form.academyList[i].grade + '级') === this.form.grade[j][0]){
                                if(!this.checkObject(this.college,(this.form.academyList[i]['academy']))){
                                    this.college.splice(this.college.length,1,{
                                        value: (this.form.academyList[i]['academy']),
                                        label: this.form.academyList[i].grade + '级/' + this.form.academyList[i]['academy']
                                    })
                                }
                            }
                        }
                    }
                }
                this.changeProfession()
            },
            checkObject(array,str){
                return array.some(item=>{
                    if(item.value === str){
                        return true
                    }
                })
            },
            checkProfession(array,str){
                return array.some(item=>{
                    if(item.name === str){
                        return true
                    }
                })
            },
            checkClassList(array,str){
                return array.some(item=>{
                    if(item[0] === str){
                        return true
                    }
                })
            },
            changeProfession(){
                let gradeList = []
                let collegeList = []
                let professionList = []
                for(let i = 0; i < this.grade.length; i++){
                    gradeList.splice(gradeList.length,1,this.grade[i].value)
                }
                for(let i = 0; i < this.college.length; i++){
                    collegeList.splice(collegeList.length,1,this.college[i].value)
                }
                for(let i = 0; i < this.profession.length; i++){
                    professionList.splice(professionList.length,1,this.profession[i].value)
                }
                // if(gradeList.indexOf(this.form.grade[0]) === -1 || collegeList.indexOf(this.form.college[0]) === -1 ||
                //     professionList.indexOf(this.form.profession[0]) === -1){
                //     return;
                // }
                if(!this.form.profession[0]){
                    if(this.form.profession.length === 0){
                        this.$set(this,"classList",[{
                            name: "",
                            list: []
                        }])
                    }
                }
                let L_t = {}
                let classList = []
                for(let j = 0; j<this.form.profession.length;j++){
                    if(!this.checkProfession(this.classList,this.form.profession[j][0])){
                        L_t.name = this.form.profession[j][0]
                        classList = []
                        let str = this.form.profession[j][0].split('/')
                        for(let i = 0; i < this.form.academyList.length;i++){
                            if((this.form.academyList[i].major) === str[2] &&
                                (this.form.academyList[i].academy) === str[1] &&
                                (this.form.academyList[i].grade + '级') ===str[0]){
                                let t = this.form.academyList[i].sclass + '班'
                                if(classList.indexOf(t) === -1){
                                    //this.form.class[j].splice(this.form.class[j].length,1,t)
                                    classList.splice(classList.length,1,t)
                                }
                            }
                        }
                        L_t.list = classList
                        if(this.classList[0].name === ""){
                            this.$set(this,'classList',[L_t])
                        }else {
                            this.classList.splice(this.classList.length,1,L_t)
                        }
                    }
                }
                for(let i = 0; i < this.classList.length; i++){
                    if(this.classList[i].name !== ""){
                        if(!this.checkClassList(this.form.profession,this.classList[i].name)){
                            this.classList.splice(i,1)
                            i--;
                        }
                    }
                }
                console.log(this.classList)
            },
            updateClass(){
                this.form3 = JSON.parse(JSON.stringify(this.form))
                this.checkVisible = true
            },
            escChangeTime(){
                this.time2 = JSON.parse(JSON.stringify(this.time))
                this.editVisible = false
            },
            ChangeTime(){
                this.time = JSON.parse(JSON.stringify(this.time2))
                this.editVisible = false
            },
            saveEdit(){
                let that = this
                let Data = []
                for(let i = 0; i < this.classList.length; i++){
                    let str = this.classList[i].name.split('/')
                    let data = {
                        grade: str[0],
                        college: str[1],
                        profession: str[2],
                        list: this.classList[i].list
                    }
                    Data.splice(Data.length,1,JSON.parse(JSON.stringify(data)))
                }
                let select = ""
                let g
                let grade
                let college
                while(Data.length > 0){
                    g = Data[0].grade + Data[0].college
                    grade = Data[0].grade
                    college = Data[0].college
                    for(let k = 0; k < Data.length; k++){
                        if(Data[k].grade === grade && Data[k].college === college){
                            g = g + Data[k].profession + '专业'
                            let classdata = ''
                            for(let j = 0; j <Data[k].list.length; j++){
                                classdata = classdata + Data[k].list[j] + '/'
                            }
                            g = g + classdata.slice(0,classdata.length-1) + '@'
                            Data.splice(k,1)
                            k--
                        }
                    }
                    select = select + g.slice(0,g.length-1) + '#'
                }
                select = select.slice(0,select.length-1)
                let classData = {
                    id:this.form3.id,
                    name :this.form3.name,
                    credit:this.form3.credit,
                    teacherC:localStorage.getItem('teacherID'),
                    type:this.form3.type,
                    keSelected:select,
                    selectTime:this.time2.selectDate1 + ' ' + this.time2.selectDate2,
                    selectEndTime:this.time2.selectDate3 + ' ' + this.time2.selectDate4,
                    quitTime: this.time2.quitDate1 + ' ' + this.time2.quitDate2,
                    quitEndTime: this.time2.quitDate3 + ' ' + this.time2.quitDate4,
                    bxTime: this.time2.bxDate1 + ' ' + this.time2.bxDate2,
                    bxEndTime: this.time2.bxDate3 + ' ' + this.time2.bxDate4,
                    minCount: this.form3.minCount
                }
                let data = []
                data[0] = classData
                console.log(data)
                postCourseSelectionInformation(data).then(function (res){
                    if (res['data'] === 'success' || res['data'].code === 200) {
                        that.$message.success('修改成功');
                        //console.log(res)
                        that.getData()
                        that.$set(this, 'form', {
                            name:'',
                            credit:'',
                            type:'',
                            grade:[],
                            college:[],
                            profession:[],
                            id:'',
                            academyList:[],
                            minCount:''
                        });
                        that.$set(this, 'form3', {
                            name:'',
                            credit:'',
                            type:'',
                            grade:[],
                            college:[],
                            profession:[],
                            id:'',
                            minCount:''
                        });
                        that.checkVisible = false
                    }
                }.bind(this)).catch(function (error) {
                    that.$message.error('修改失败')
                })
            },
            del(){
                let that = this
                this.$confirm('将会删除该课程所有信息，确定要删除吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        let url = "http://www.nishishei.xyz/xk/course/delCourse?id=" + this.form3.id
                        deleteCourseInformation(this.form3.id).then(function (res){
                            this.getData()
                            if (res['data'] === 'success' || res['data'].code === 200) {
                                this.$message.success('删除成功');
                                that.$set(this, 'form', {
                                    name:'',
                                    credit:'',
                                    type:'',
                                    grade:[],
                                    college:[],
                                    profession:[],
                                    id:'',
                                    academyList:[],
                                    minCount:''
                                });
                                that.$set(this, 'form3', {
                                    name:'',
                                    credit:'',
                                    type:'',
                                    grade:[],
                                    college:[],
                                    profession:[],
                                    id:'',
                                    minCount:''
                                });
                            }
                        }.bind(this)).catch(function (error) {
                            that.$message.error('删除失败')
                        })
                    })
                    .catch((error) => {
                        this.$message.error('删除失败');
                    });
            },
            add(){
                if(this.form.name === ''){
                    this.$message.error('请选择课程');
                    return
                }
                this.$set(this, 'form2', {
                    name:this.form.name,
                    credit:this.form.credit,
                    type:this.form.type,
                    grade:[],
                    college:[],
                    profession:[],
                    class: [],
                    id:this.form.id,
                    minCount:''
                });
                this.addVisible = true
            },
            clickAll(val){
                if(val){
                    let list = new Array()
                    for(let i = 0; i < this.classlist.length; i++){
                        list[i] = this.classlist[i]
                    }
                    list[list.length] = '全选'
                    this.form2.class = list
                }else{
                    this.form2.class = []
                }
            },
            saveadd(){
                for(let i in this.form2){
                    if(this.form2[i] == ''){
                        this.$message.error('选课信息缺失');
                        return
                    }
                }
                let f1 = true
                let f2 = true
                let f3 = true
                let profession = this.form2.grade[0] + '/' + this.form2.college[0] + '/' + this.form2.profession
                for(let i = 0; i < this.form.grade.length; i++){
                    if(this.form.grade[i][0] === this.form2.grade[0]){
                        f1 = false
                        break
                    }
                }
                for(let i = 0; i < this.form.college.length; i++){
                    if(this.form.college[i][0] === this.form2.college[0]){
                        f2 = false
                        break
                    }
                }
                for(let i = 0; i < this.form.profession.length; i++){
                    if(this.form.profession[i][0] === profession){
                        f3 = false
                        break
                    }
                }
                if(f1){
                    this.grade.splice(this.grade.length,1,{
                        value: this.form2.grade[0],
                        label: this.form2.grade[0]
                    })
                    this.form.grade.splice(this.form.grade.length,1,JSON.parse(JSON.stringify([this.form2.grade[0]])))
                }
                if(f2){
                    this.college.splice(this.college.length,1,{
                        value: this.form2.college[0],
                        label: this.form2.grade[0] + '/' + this.form2.college[0]
                    })
                    this.form.college.splice(this.form.college.length,1,JSON.parse(JSON.stringify([this.form2.college[0]])))
                }
                if(f3){
                    let str = this.form2.grade[0] + '/' + this.form2.college[0] + '/' + this.form2.profession
                    this.profession.splice(this.profession.length,1,{
                        value: str,
                        label: str
                    })
                    this.form.profession.splice(this.form.profession.length,1,JSON.parse(JSON.stringify([str])))
                }
                let L_t = {}
                L_t.name = this.form2.grade[0] + '/' + this.form2.college[0] + '/' + this.form2.profession
                if(this.form2.class.indexOf("全选") !== -1){
                    this.form2.class.splice(this.form2.class.indexOf("全选"),1)
                }
                L_t.list = this.form2.class
                if(this.classList[0].name === ""){
                    this.classList = [L_t]
                }else {
                    this.classList.splice(this.classList.length,1,L_t)
                }
                this.addVisible = false
            }
        },
    }

</script>

<style scoped>
    .container{
        height: 90%;
    }
    .leftBox{
        float: left;
        width: 50%;
        height: 100%;
        overflow: auto;
    }
    .rightBox{
        float: right;
        width: calc(50% - 1px);
        height: 96%;
        border-left: 1px solid #E4E7ED;
        margin-top: 1%;
        overflow: auto;
    }
    .leftBox::-webkit-scrollbar {/*滚动条整体样式*/
        width: 7px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
    }
    .leftBox::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 2px rgba(0,0,0,0.2);
        background: #2d8cf0;
    }
    .leftBox::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 2px rgba(0,0,0,0.2);
        border-radius: 10px;
        background: #E4E7ED;
    }
    .rightBox::-webkit-scrollbar {/*滚动条整体样式*/
        width: 7px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
    }
    .rightBox::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 2px rgba(0,0,0,0.2);
        background: #2d8cf0;
    }
    .rightBox::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 2px rgba(0,0,0,0.2);
        border-radius: 10px;
        background: #E4E7ED;
    }
    .select-z{
        z-index: 10;
        width: 100%;
    }
    .select-z-2{
        z-index: 0;
        width: 100%;
        pointer-events: none;
    }
</style>
<style>
    .el-table .cell {
        white-space: pre-line;
    }
    .classItem{
        float: right;
        margin-right: 5%;
        margin-top: -20px;
        font-size: 10px;
    }
</style>