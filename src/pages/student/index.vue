<template>
    <f7-page class="bg-page" ptr :ptr-mousewheel="true" @ptr:refresh="loadMore">
        <f7-navbar :sliding="false" color="white" navbar-fixed>
            <f7-nav-left>
                <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
            </f7-nav-left>
            <f7-nav-title sliding>Students</f7-nav-title>
        </f7-navbar>

        <f7-toolbar top tabbar labels>
            <f7-link tab-link="#tab-1" tab-link-active>
                <f7-icon md="material:person_add">
                </f7-icon>
                <span class="tabbar-label">Add New</span>
            </f7-link>
            <f7-link tab-link="#tab-2">
                <f7-icon md="material:people">
                    <f7-badge color="red">{{ students ? students.length : 0 }}</f7-badge>
                </f7-icon>
                <span class="tabbar-label">All Students</span>
            </f7-link>
        </f7-toolbar>

        <f7-tabs swipeable class="main-top">
            <f7-tab id="tab-1" tab-active>
                <AddStudent />
            </f7-tab>
            <f7-tab id="tab-2">
                <f7-searchbar search-container=".search-list" search-in=".item-title" :disable-button="!$theme.aurora">
                </f7-searchbar>
                <f7-list class="searchbar-not-found">
                    <f7-list-item title="Nothing found"></f7-list-item>
                </f7-list>
                <f7-list class="search-list searchbar-found">
                    <f7-list-item :link="`/student/${student.id}/`" :header="student.level.toUpperCase()" :title="student.name.toUpperCase()"
                        after="Edit" v-for="(student, index) in students" :key="index">
                        <img slot="media" :src="`https://i.pravatar.cc/150?img=3${ index + 1 }`" width="44" />
                    </f7-list-item>
                </f7-list>
            </f7-tab>
        </f7-tabs>
    </f7-page>
</template>

<script>
    import AddStudent from './add.vue'
    export default {
        components: {
            AddStudent
        },
        computed: {
            students() {
                return this.$store.getters.getStudents
            }
        },
        methods: {
            loadMore(done) {
                this.$store.dispatch("fetchAllStudents")
                    .then(res => done());
            }
        }
    }
</script>

<style scoped>
    .main-top {
        margin-top: 0px;
    }
</style>