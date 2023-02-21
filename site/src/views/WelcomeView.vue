<template>
    <div class="d-flex ml-4 justify-content-center">
        <img style="width: 50%" src="../assets/Logo_WashConnect.png" />
    </div>

    <br/>
    <h1 id="title" class="d-flex ml-3 justify-content-center">WashConnect</h1>
    <h2 Class="d-flex ml-3 justify-content-center" style="font-size: 30px;">Welcome!</h2>

    <br/>
    <div id="welcome-alert" class="alert alert-primary ml-4" style="width: 90%; background-color: #3697c8;" role="alert">
        <div id="alert-text" style="color: white;"> Share your washing machine to your neighbors. <br/> Join us now ! </div>
    </div>

    <br/>
    <div>
        <RouterLink type="button" class="btn btn-primary btn-lg border-light" style="background-color: #3697c8;" :to="`/register`">
            I'm not a member yet
        </RouterLink>

        <RouterLink type="button" class="btn btn-outline-primary btn-lg border" style="color: #3697c8;" :to="`/login`">
            I already have an account
        </RouterLink>
    </div>
</template>


<script>
    import { useRoute } from "vue-router";
</script>


<style>
    #title {
        font-family: 'Open Sans';
        font-weight: bold;
        font-size: 40px;
    }

    #welcome-alert {
        margin-left: 5%;
        size: 80%;
    }

    #alert-text {
        text-align: center;
        font-size: 20px
    }

    .btn {
        margin-left: 25%; 
        margin-bottom: 5%; 
        width: 50%; 
    }

    .border {
        border-color: #3697c8;
    }
</style>