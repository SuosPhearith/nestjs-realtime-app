<template>
  <div>
    <button class="btn btn-outline-primary mt-2" @click="handleCreate">
      Create new
    </button>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Title</th>
          <th scope="col">Description</th>
          <th scope="col">Body</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(article, index) in articles" :key="article.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ article.title }}</td>
          <td>{{ article.description }}</td>
          <td>{{ article.body }}</td>
          <td>
            <button class="btn btn-primary" @click="handleUpdate(article)">
              Update
            </button>
            <button class="btn btn-danger" @click="deleteArticle(article.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="updateId || isCreate" class="bg-secondary p-5">
      <input type="text" v-model="title" placeholder="title" />
      <input type="text" v-model="description" placeholder="description" />
      <input type="text" v-model="body" placeholder="body" />
      <div class="d-flex">
        <button
          v-if="updateId"
          class="btn btn-warning me-1"
          @click="updateArticle"
        >
          Okay
        </button>
        <button v-else @click="createArticle" class="btn btn-warning me-1">
          create
        </button>
        <button v-if="updateId" class="btn btn-primary" @click="handleCancel()">
          Cancel
        </button>
        <button v-else class="btn btn-primary" @click="isCreate = false">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      articles: [],
      title: "",
      description: "",
      body: "",
      updateId: null,
      isCreate: false,
    };
  },
  mounted() {
    this.fetchArticles();
  },
  methods: {
    async fetchArticles() {
      try {
        const response = await axios.get("http://localhost:3000/articles/all");
        this.articles = response.data;
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    },
    handleCancel() {
      this.title = "";
      this.description = "";
      this.body = "";
      this.updateId = null;
      this.isCreate = false;
    },
    handleUpdate(article) {
      this.isCreate = false;
      this.title = article.title;
      this.description = article.description;
      this.body = article.body;
      this.updateId = article.id;
    },
    handleCreate() {
      this.handleCancel();
      this.updateId = null;
      this.isCreate = true;
    },
    async updateArticle() {
      try {
        const response = await axios.patch(
          `http://localhost:3000/articles/${this.updateId}`,
          {
            title: this.title,
            description: this.description,
            body: this.body,
          }
        );
        console.log("Article updated:", response.data);
        // You might want to refresh the list of articles after updating
        this.fetchArticles();
        this.handleCancel();
      } catch (error) {
        console.error("Error updating article:", error);
      }
    },
    async createArticle() {
      try {
        const response = await axios.post(`http://localhost:3000/articles`, {
          title: this.title,
          description: this.description,
          body: this.body,
        });
        console.log("Article updated:", response.data);
        // You might want to refresh the list of articles after updating
        this.fetchArticles();
        this.handleCancel();
      } catch (error) {
        console.error("Error updating article:", error);
      }
    },
    async deleteArticle(articleId) {
      try {
        await axios.delete(`http://localhost:3000/articles/${articleId}`);
        console.log("Article deleted:", articleId);
        // You might want to refresh the list of articles after deleting
        this.fetchArticles();
      } catch (error) {
        console.error("Error deleting article:", error);
      }
    },
  },
};
</script>

<style>
/* Your component styles */
</style>
