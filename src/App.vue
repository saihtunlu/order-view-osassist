<template>
  <div>
    <div class="row mx-0 pt-3" style="max-width: 400px; margin: auto">
      <div class="flex-x-center" style="padding: 0px 10px">
        <h4 class="mb-0">{{ order.store_name }}</h4>
        <p class="mb-0">Date : {{ order.date }}</p>
      </div>
      <div class="content">
        <div
          class="card-product"
          v-for="(product, index) in order.products"
          :key="index"
        >
          <img
            :src="product.image"
            class="item-img"
            @click="viewImage(product.image)"
            alt="Image"
          />
          <div>
            <p class="gray-bg" style="text-align: center">
              No : {{ index + 1 }}
            </p>
            <p class="gray-bg" style="text-align: center">
              Details : {{ product.name || "-" }}
            </p>
            <p class="gray-bg" style="text-align: center">
              Quantity : {{ product.quantity }}
            </p>
            <p class="gray-bg" style="text-align: center">
              Rate : {{ product.quantity }}x{{ product.price }}
            </p>
            <p style="text-align: center" class="gray-bg">
              Total : {{ product.subtotal }}
            </p>
          </div>
          <div class="order-card-product-footer">
            <a
              style="text-align: center"
              class="go-to-app"
              target="blank"
              :href="product.link"
              >Link
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style="margin-left: 2px; position: relative; top: 3px"
                width="20"
                fill="#fff"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  d="M13 3L16.293 6.293 9.293 13.293 10.707 14.707 17.707 7.707 21 11 21 3z"
                />
                <path
                  d="M19,19H5V5h7l-2-2H5C3.897,3,3,3.897,3,5v14c0,1.103,0.897,2,2,2h14c1.103,0,2-0.897,2-2v-5l-2-2V19z"
                /></svg
            ></a>
          </div>
        </div>
        <div class="card-product">
          <h5>Total price of {{ order.products.length }} Items</h5>
          <p class="gray-bg">Total Price : {{ order.total }}</p>
        </div>
      </div>
    </div>
    <CoolLightBox
      :items="images"
      :useZoomBar="true"
      :index="index"
      @close="index = null"
    >
    </CoolLightBox>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      order: {
        products: [],
      },
      loading_: null,
      images: [],
      index: null,
      openImage: false,
      gettingSale: true,
    };
  },
  created() {
    const queries = new URLSearchParams(window.location.search);
    const sid = queries.get("sid");
    const oid = queries.get("oid");
    const date = queries.get("date");

    this.getOrder(sid, oid, date);
  },
  methods: {
    viewImage(img) {
      this.images = [img];
      this.index = 0;
    },
    getOrder(sid, oid, date) {
      var link = `https://osassist.herokuapp.com/api/order-view/?sid=${sid}&oid=${oid}&date=${date}`;
      axios
        .get(link)
        .then((response) => {
          this.order = response.data;
          response.data.products.forEach((item) => {
            var img = new Image();
            img.src = item.image;
          });
          const loader = document.querySelector(".page-loader");
          loader.className += " hidden";
          setTimeout(() => {
            loader.className += " display_none";
          }, 1000);
        })
        .catch(() => {
          alert("Error!");
        });
    },
  },
};
</script>

    <style >
body {
  margin: 0px !important;
}
.px-2 {
  margin-right: 10px;
  margin-left: 10px;
}
.pt-3 {
  padding-top: 15px;
}
.mb-3 {
  margin-bottom: 15px;
}
.route-view {
  height: 100vh;
}
.cool-lightbox .cool-lightbox__inner {
  padding: 0px !important;
}
.row {
  background: rgb(229, 232, 233);
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  max-width: 400px;
  overflow-y: auto;
}
.cool-lightbox {
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0;
  width: 100vw !important;
  height: 100vh !important;
  padding: 0px !important;
}
button.cool-lightbox-toolbar__btn {
  background: rgb(115, 103, 240) !important;
  color: #fff !important;
  border-radius: 5px !important;
}
.cool-lightbox .cool-lightbox__slide img {
  width: 100%;
  height: 100%;
  border-radius: 0px !important;
}
.cool-lightbox-toolbar {
  top: 5px !important;
  right: 5px !important;
}
.flex-x-center {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
p,
a {
  font-size: 16px !important;
}
.item-img {
  width: 100%;
  border-radius: 5px;
  height: 140px;
  object-fit: cover;
  filter: brightness(0.9);
  cursor: pointer;
}
.go-to-app {
  padding: 8px 15px;
  display: block;
  background: rgb(115, 103, 240);
  color: #fff;
  text-decoration: none;
  margin-top: 10px;
  border-radius: 5px;
}
.go-to-app:active {
  background: rgb(115, 103, 240, 0.7);
}
.card-product {
  width: calc(100vw - 36px);
  max-width: calc(400px - 50px);
  background: rgb(255, 255, 255);
  box-shadow: 0px 4px 25px -8px rgb(0 0 0 / 20%);
  border-radius: 10px;
  padding: 8px !important;
  margin: 15px 10px !important;
}
.gray-bg {
  background: rgb(0, 0, 0, 0.05);
  padding: 8px;
  border-radius: 5px;
  text-align: start !important;
  margin: 5px 0px !important;
}
</style>