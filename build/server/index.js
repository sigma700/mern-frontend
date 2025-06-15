import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts, Link, Form, useParams } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import AOS from "aos";
import { useState, useEffect } from "react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      className: "h-full",
      children: [children, /* @__PURE__ */ jsx("div", {
        className: "bg-black",
        children: /* @__PURE__ */ jsx("footer", {})
      }), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function meta() {
  return [{
    title: "Home"
  }, {
    name: "description",
    content: "Welcome to React Router!"
  }];
}
const home = UNSAFE_withComponentProps(function Home() {
  const [serverData, setBackendData] = useState([]);
  const backendUrl2 = void 0;
  useEffect(() => {
    fetch(`${backendUrl2}/api/schools`).then((response) => response.json()).then((data2) => {
      console.log(data2);
      setBackendData(data2);
    });
  }, []);
  console.log({
    serverData
  });
  useEffect(() => {
    AOS.init({
      duration: 3e3,
      easing: "ease-in-out",
      once: true
    });
  });
  return /* @__PURE__ */ jsxs("main", {
    className: " h-full p-[10px]",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "flex flex-col justify-center items-center h-screen",
      style: {
        backgroundImage: "url('/female-teacher-talking-with-students.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        opacity: "0.9"
      },
      children: [/* @__PURE__ */ jsx("h1", {
        className: "text-black text-[30px] mb-[30px] font-extrabold text-center",
        children: "We understand that education is key we simply help you find it"
      }), /* @__PURE__ */ jsxs("p", {
        className: "text-black text-center m-[10px] font-bold",
        children: ["Discover the best schools near your area that fit your", " ", /* @__PURE__ */ jsx("span", {
          className: "text-white",
          children: "needs"
        })]
      }), /* @__PURE__ */ jsxs("div", {
        "data-aos": "slide-left",
        className: "p-[30px] text-center gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100\n",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-[30px] text-black",
          children: "Welcome"
        }), /* @__PURE__ */ jsx("small", {
          className: "text-black text-[20px]",
          children: "Do you want to : "
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex gap-[20px] mt-[30px]",
          children: [/* @__PURE__ */ jsx(Link, {
            to: "/finding",
            className: "bg-black p-[10px] font-extralight border-yellow-500 border active:bg-[#00df82] active:border-none active:text-black hover:bg-[#00df82] hover:border-none hover:cursor-pointer hover:transition-colors hover:duration-[0.2s] duration-[0.3s]",
            children: "Find a School"
          }), /* @__PURE__ */ jsx(Link, {
            to: "/listing",
            className: "bg-black p-[10px] font-extralight border-yellow-500 border active:bg-[#00df82] active:border-none active:text-black hover:bg-[#00df82] hover:border-none hover:cursor-pointer hover:transition-colors hover:duration-[0.2s] duration-[0.3s]",
            children: "List your School"
          })]
        })]
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "bg-[#fbf4da] text-black p-[5px]",
      children: [/* @__PURE__ */ jsx("h2", {
        className: "text-center text-[30px]",
        children: "Quick Search"
      }), /* @__PURE__ */ jsxs(Form, {
        method: "post",
        className: "flex items-center gap-[10px] text-white lg:justify-center",
        children: [/* @__PURE__ */ jsx("input", {
          className: "p-[10px] bg-[#001822] rounded-[10px] lg:w-[500px] lg:p-[20px]",
          type: "text",
          placeholder: "Enter school name"
        }), /* @__PURE__ */ jsx("button", {
          className: "bg-white p-[10px] rounded-[50%] border border-black lg:hover:cursor-pointer lg:hover:bg-transparent lg:rounded-[10px] lg:hover:rounded-[50%] lg:hover:transition-all lg:hover:duration-[0.3s] duration-[0.4s]",
          type: "submit",
          children: /* @__PURE__ */ jsx("img", {
            src: "/search.svg",
            alt: ""
          })
        })]
      }), /* @__PURE__ */ jsxs("p", {
        className: "p-[10px] text-[40px] text-center mt-[30px] font-light",
        children: ["Featured ", /* @__PURE__ */ jsx("span", {
          className: "font-extrabold",
          children: "Schools"
        })]
      }), /* @__PURE__ */ jsx("div", {
        children: !serverData ? /* @__PURE__ */ jsx("p", {
          children: "Loading..."
        }) : Array.isArray(serverData) ? (
          // If API returns array directly
          /* @__PURE__ */ jsx("div", {
            className: "grid grid-cols-1 md:grid-cols-3 gap-4 p-4",
            children: serverData.map((school2) => {
              var _a;
              return /* @__PURE__ */ jsxs("div", {
                className: "bg-white p-4 rounded-lg shadow-md",
                children: [/* @__PURE__ */ jsx("h3", {
                  className: "text-xl font-bold mb-2",
                  children: school2.name
                }), ((_a = school2.images) == null ? void 0 : _a[0]) && // Only show first image if it exists
                /* @__PURE__ */ jsx("img", {
                  src: school2.images[0],
                  alt: `${school2.name} - Cover`,
                  className: "w-full h-48 object-cover rounded hover:opacity-[0.7]"
                }), /* @__PURE__ */ jsx("p", {
                  className: "mt-2 text-gray-600",
                  children: school2.description
                })]
              }, school2._id);
            })
          })
        ) : serverData.data ? (
          // If API returns { data: [...] }
          /* @__PURE__ */ jsx("div", {
            "data-aos": "",
            className: "grid grid-cols-1 md:grid-cols-3 gap-4 p-4",
            children: serverData.data.map((school2) => {
              var _a;
              return /* @__PURE__ */ jsxs("div", {
                className: "bg-white p-4 rounded-lg shadow-md",
                children: [/* @__PURE__ */ jsx("h3", {
                  className: "text-xl font-bold mb-2",
                  children: school2.name
                }), ((_a = school2.images) == null ? void 0 : _a[0]) && /* @__PURE__ */ jsx("img", {
                  src: school2.images[0],
                  alt: `${school2.name} - Cover`,
                  className: "w-full h-48 object-cover rounded hover:opacity-[0.7] hover:cursor-pointer hover:transition-all hover:duration-[0.4s] hover:scale-[1.009]"
                }), /* @__PURE__ */ jsx("p", {
                  className: "mt-2 text-gray-600",
                  children: school2.description
                })]
              }, school2._id);
            })
          })
        ) : /* @__PURE__ */ jsx("p", {
          children: "No schools found."
        })
      })]
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
function Navbar() {
  const sideBarData = [
    {
      title: "Home",
      path: "/",
      icon: "house.svg"
    }
  ];
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);
  return /* @__PURE__ */ jsxs("main", { className: "lg:hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "nav-bar float-right", children: /* @__PURE__ */ jsx(Link, { to: "#", className: "menu-bars", onClick: toggleSidebar, children: /* @__PURE__ */ jsx("img", { className: "w-[30px]", src: "/menu.svg", alt: "Menu" }) }) }),
    /* @__PURE__ */ jsx("nav", { className: `nav-menu ${isSidebarVisible ? "active" : "inactive"}`, children: isSidebarVisible && /* @__PURE__ */ jsxs("ul", { className: "bg-black p-[20px] rounded-[10px] absolute right-0 top-0 h-full transform ease-in-out transition-all duration-[0.3s]", children: [
      /* @__PURE__ */ jsx("li", { className: "nav-bar-toggle", children: /* @__PURE__ */ jsx(
        Link,
        {
          onClick: toggleSidebar,
          to: "#",
          className: "menu-bars text-center",
          children: /* @__PURE__ */ jsx("img", { src: "/x.svg", alt: "Close" })
        }
      ) }),
      sideBarData.map((item, index) => /* @__PURE__ */ jsxs("li", { className: "flex gap-[20px] items-center", children: [
        /* @__PURE__ */ jsx("img", { className: "w-[20px]", src: item.icon, alt: "" }),
        /* @__PURE__ */ jsx("span", { children: item.title })
      ] }, index))
    ] }) })
  ] });
}
function NavLarge() {
  const navBarData = [
    {
      title: "Home",
      path: "/",
      icon: "house.svg"
    }
  ];
  return /* @__PURE__ */ jsx("main", { className: "hidden lg:block", children: /* @__PURE__ */ jsx("div", { className: "float-right", children: /* @__PURE__ */ jsx("ul", { children: navBarData.map((item, index) => /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsxs(Link, { className: "flex gap-[20px]", to: item.path, children: [
    /* @__PURE__ */ jsx("img", { src: item.icon, alt: "" }),
    /* @__PURE__ */ jsx("span", { children: item.title })
  ] }) }, index)) }) }) });
}
const finding = UNSAFE_withComponentProps(function Finding() {
  var _a;
  const [schools, setSchools] = useState([]);
  const [collection2, setCollection] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const backendUrl2 = "https://schoolflex-backend-1.onrender.com/";
        const url = searchQuery ? (
          //INTRODUCE REACT HOOK FOR DEBOUNCE
          `${backendUrl2}/api/schools/search-exact?name=${encodeURIComponent(searchQuery)}`
        ) : `${backendUrl2}/api/schools`;
        const response = await fetch(url);
        console.log(response);
        if (!response.ok) throw new Error("Network response was not ok");
        const {
          data
        } = await response.json();
        console.log("data", data);
        let schoolsArray = [];
        if (Array.isArray(data)) {
          schoolsArray = data;
        } else if (Array.isArray(data.data)) {
          schoolsArray = data.data;
        } else if (data && typeof data === "object") {
          schoolsArray = [data];
        }
        setSchools(schoolsArray);
        console.log(schoolsArray);
      } catch (err) {
        setError(err.message);
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [searchQuery]);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("search");
    setSearchQuery(query);
  };
  const addToCollection = async (school2) => {
    try {
      const response = await fetch(`${backendUrl}/api/collections`, {
        method: "POST",
        headers: {
          "Content-Type ": "application/json"
        },
        body: JSON.stringify({
          schoolId: school2._id
        }),
        credentials: "include"
      });
      if (!response.ok) {
        throw new Error("Failed to add to collection");
      }
      setCollection((prev) => [...prev, school2]);
      alert(`${school2.name} added to collections`);
    } catch (error2) {
      console.error("Error adding school to the collections");
      alert("Failed to add to collection");
    }
  };
  return /* @__PURE__ */ jsxs("main", {
    className: "bg-[#fbf4da] h-full text-black",
    children: [/* @__PURE__ */ jsx("style", {
      children: `
                    main {
                            min-height: full;
                            width: 100vw;
                            background-image: url('/milad-fakurian-GJKx5lhwU3M-unsplash.jpg');
                            background-size: cover;
                            background-position: center;
                            background-repeat: no-repeat;
                            margin: 0;
                            padding: 0;
                    }
            `
    }), /* @__PURE__ */ jsx("h1", {
      children: "Logo"
    }), /* @__PURE__ */ jsx(Navbar, {}), /* @__PURE__ */ jsx(NavLarge, {}), /* @__PURE__ */ jsxs("div", {
      className: "mt-[30px]",
      children: [/* @__PURE__ */ jsxs(Form, {
        onSubmit: handleSearchSubmit,
        method: "post",
        action: "",
        className: "flex items-center gap-[10px] text-white lg:justify-center",
        children: [/* @__PURE__ */ jsx("input", {
          className: "p-[10px] bg-[#001822] rounded-[10px] lg:w-[500px] lg:p-[10px]",
          type: "text",
          placeholder: "Enter school name",
          name: "search",
          defaultValue: searchQuery
        }), /* @__PURE__ */ jsx("button", {
          className: "bg-white p-[10px] rounded-[50%] border border-black lg:hover:cursor-pointer lg:hover:bg-transparent lg:rounded-[10px] lg:hover:rounded-[50%] lg:hover:transition-all lg:hover:duration-[0.3s] duration-[0.4s]",
          type: "submit",
          children: /* @__PURE__ */ jsx("img", {
            src: "/search.svg",
            alt: ""
          })
        }), /* @__PURE__ */ jsxs("div", {
          className: "hidden lg:flex gap-[10px]",
          children: [/* @__PURE__ */ jsx("div", {
            className: "text-black",
            children: /* @__PURE__ */ jsxs("div", {
              className: "flex items-center gap-[10px]",
              children: [/* @__PURE__ */ jsx("div", {
                className: "bg-white p-[10px] border border-black rounded-[50%] hover:bg-transparent hover:cursor-pointer hover:transition-colors hover:duration-[0.4s] duration-[0.3s]",
                children: /* @__PURE__ */ jsx("img", {
                  src: "/headset.svg",
                  alt: ""
                })
              }), /* @__PURE__ */ jsx("p", {
                children: "Call for support"
              })]
            })
          }), /* @__PURE__ */ jsx("div", {
            className: "text-black",
            children: /* @__PURE__ */ jsxs(Link, {
              className: "flex items-center gap-[10px] ",
              to: "/collection",
              children: [/* @__PURE__ */ jsx("div", {
                className: "flex bg-white p-[10px] border border-black rounded-[50%] hover:bg-transparent hover:cursor-pointer hover:transition-colors hover:duration-[0.4s] duration-[0.3s]",
                children: /* @__PURE__ */ jsx("img", {
                  src: "/package-open.svg",
                  alt: ""
                })
              }), /* @__PURE__ */ jsx("p", {
                children: "Your Collection"
              })]
            })
          }), /* @__PURE__ */ jsx("div", {
            className: "text-black",
            children: /* @__PURE__ */ jsxs("div", {
              className: "flex items-center gap-[10px]",
              children: [/* @__PURE__ */ jsx("div", {
                className: "bg-white p-[10px] border border-black rounded-[50%] hover:bg-transparent hover:cursor-pointer hover:transition-colors hover:duration-[0.4s] duration-[0.3s]",
                children: /* @__PURE__ */ jsx("img", {
                  src: "/sun.svg",
                  alt: ""
                })
              }), /* @__PURE__ */ jsx("p", {
                children: "Dark/Light Mode"
              })]
            })
          }), /* @__PURE__ */ jsx("div", {
            className: "text-black",
            children: /* @__PURE__ */ jsxs(Link, {
              to: "/dashboard",
              className: "flex items-center gap-[10px]",
              children: [/* @__PURE__ */ jsx("div", {
                className: "bg-white p-[10px] border border-black rounded-[50%] hover:bg-transparent hover:cursor-pointer hover:transition-colors hover:duration-[0.4s] duration-[0.3s]",
                children: /* @__PURE__ */ jsx("img", {
                  src: "/user.svg",
                  alt: ""
                })
              }), /* @__PURE__ */ jsx("p", {
                children: "Dashboard"
              })]
            })
          })]
        })]
      }), /* @__PURE__ */ jsxs("div", {
        children: [schools.length > 0 && searchQuery && /* @__PURE__ */ jsxs("div", {
          className: "bg-white rounded-lg shadow-lg p-6 mb-6 max-w-2xl mx-auto mt-[30px] h-full",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-2xl font-bold mb-4",
            children: schools[0].name
          }), ((_a = schools[0].images) == null ? void 0 : _a.length) > 0 && /* @__PURE__ */ jsx("img", {
            src: schools[0].images[0],
            alt: `${schools[0].name} - Cover`,
            className: "w-full h-64 object-cover rounded mb-4"
          }), /* @__PURE__ */ jsxs("p", {
            className: "mb-2",
            children: [/* @__PURE__ */ jsx("span", {
              className: "font-semibold",
              children: "Description:"
            }), " ", schools[0].description || "No description available"]
          }), /* @__PURE__ */ jsxs("p", {
            className: "mb-2",
            children: [/* @__PURE__ */ jsx("span", {
              className: "font-semibold",
              children: "Location:"
            }), " ", schools[0].location || "N/A"]
          }), /* @__PURE__ */ jsxs("p", {
            className: "mb-2",
            children: [/* @__PURE__ */ jsx("span", {
              className: "font-semibold",
              children: "Type:"
            }), " ", schools[0].type || "N/A"]
          }), /* @__PURE__ */ jsxs("p", {
            className: "mb-2",
            children: [/* @__PURE__ */ jsx("span", {
              className: "font-semibold",
              children: "Fee:"
            }), " ", schools[0].fee || "N/A"]
          }), /* @__PURE__ */ jsx("button", {
            onClick: () => {
              addToCollection(school);
            },
            className: "bg-[#e1eaeb] p-[10px] rounded-[10px] font-light border hover:bg-[#001822] hover:text-white hover:border hover:border-none hover:transition-colors hover:duration-[0.4s] hover:cursor-pointer duration-[0.3s] mt-4",
            children: "Add to collection"
          })]
        }), /* @__PURE__ */ jsx("h2", {
          className: "text-[30px] text-center mt-[20px]",
          children: searchQuery ? `Search results for "${searchQuery}"` : "All schools"
        }), isLoading ? /* @__PURE__ */ jsx("p", {
          className: "text-[30px] text-center items-center h-full",
          children: "loading..."
        }) : error ? /* @__PURE__ */ jsxs("p", {
          children: ["Error : ", error]
        }) : schools.length > 1 || !searchQuery ? /* @__PURE__ */ jsx("div", {
          className: "grid grid-cols-1 md:grid-cols-3 gap-4 p-4",
          children: schools.map((school2) => {
            var _a2;
            return /* @__PURE__ */ jsxs("div", {
              className: "bg-white p-4 rounded-lg shadow-md",
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-xl font-bold mb-2",
                children: school2.name
              }), ((_a2 = school2.images) == null ? void 0 : _a2[0]) && /* @__PURE__ */ jsx(Link, {
                to: `/finding/${school2._id}`,
                children: /* @__PURE__ */ jsx("img", {
                  src: school2.images[0],
                  alt: `${school2.name} - Cover`,
                  className: "w-full h-48 object-cover rounded hover:opacity-[0.7] hover:cursor-pointer hover:transition-all hover:duration-[0.4s] hover:scale-[1.009]"
                })
              }), /* @__PURE__ */ jsx("p", {
                className: "mt-2 text-gray-600",
                children: school2.description || "No description available"
              }), /* @__PURE__ */ jsx("button", {
                className: "bg-[#e1eaeb] p-[10px] rounded-[10px] font-light border hover:bg-[#001822] hover:text-white hover:border hover:border-none hover:transition-colors hover:duration-[0.4s] hover:cursor-pointer duration-[0.3s]",
                children: "Add to collection"
              })]
            }, school2._id);
          })
        }) : null]
      })]
    }), /* @__PURE__ */ jsx("div", {
      className: "flex"
    })]
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: finding
}, Symbol.toStringTag, { value: "Module" }));
const listing = UNSAFE_withComponentProps(function Listing() {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    fee: "",
    location: "",
    system: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const handleChange = (e) => {
    const {
      name,
      value
    } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);
    try {
      const formPayload = new FormData();
      console.log("Form Data", formData);
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== void 0) {
          formPayload.append(key, value);
        }
      });
      for (let [key, value] of formPayload.entries()) {
        console.log(key, value);
      }
      const response = await fetch("http://localhost:4000/api/schools/create", {
        method: "POST",
        headers: {
          // "Content-Type": "application/json",
          // Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formPayload
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to create school");
      }
      if (data.success) {
        setSuccess(true);
        setFormData({
          name: "",
          location: "",
          type: "",
          fee: "",
          contact: "",
          system: "",
          image: null
        });
      }
    } catch (error2) {
      setError("Could not create school");
    } finally {
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxs("main", {
    className: "text-black h-full flex items-center justify-center",
    children: [/* @__PURE__ */ jsx("style", {
      children: `
                    main {
                            min-height: 100vh;
                            width: 100vw;
                            background-image: url('/milad-fakurian-GJKx5lhwU3M-unsplash.jpg');
                            background-size: cover;
                            background-position: center;
                            background-repeat: no-repeat;
                            margin: 0;
                            padding: 0;
                    }
            `
    }), /* @__PURE__ */ jsxs("div", {
      children: [/* @__PURE__ */ jsx("h1", {
        className: "lg:text-[30px] text-center mb-[30px]",
        children: "Provide your school info"
      }), /* @__PURE__ */ jsxs("div", {
        className: "lg:w-[480px] w-[350px] p-[20px] lg:p-[100px]",
        style: {
          border: "3px solid #ccc",
          borderRadius: "8px",
          margin: "0 auto"
        },
        children: [error && /* @__PURE__ */ jsx("div", {
          className: "bg-red-500 text-black p-[10px] rounded-[10px] mt-[20px]",
          children: error
        }), success && /* @__PURE__ */ jsxs("div", {
          className: "bg-green-500 text-black p-[10px] rounded-[10px] mt-[30px]",
          children: ["School created succesfully thank you", " "]
        }), /* @__PURE__ */ jsx("h2", {
          className: "lg:text-[30px] text-blue-600 font-extrabold text-center text-[30px]",
          children: "Upload an Image"
        }), /* @__PURE__ */ jsxs("form", {
          onSubmit: handleSubmit,
          children: [/* @__PURE__ */ jsx("input", {
            type: "file",
            accept: "image/*"
          }), /* @__PURE__ */ jsx("button", {
            className: "bg-blue-500 text-white p-[10px] rounded-[10px] font-extralight",
            type: "submit",
            style: {
              marginTop: "10px"
            },
            children: "Upload"
          }), /* @__PURE__ */ jsxs(FormSpacer, {
            children: [/* @__PURE__ */ jsx(Label, {
              text: "Name"
            }), /* @__PURE__ */ jsx(Input, {
              name: "name",
              value: formData.name,
              onChange: handleChange,
              type: "text",
              placeholder: "Enter school name"
            })]
          }), /* @__PURE__ */ jsxs(FormSpacer, {
            children: [/* @__PURE__ */ jsx(Label, {
              text: "Location"
            }), /* @__PURE__ */ jsx(Input, {
              name: "location",
              value: formData.location,
              onChange: handleChange,
              type: "text",
              placeholder: "School Location"
            })]
          }), /* @__PURE__ */ jsxs(FormSpacer, {
            children: [/* @__PURE__ */ jsx(Label, {
              text: "Type"
            }), /* @__PURE__ */ jsx(Input, {
              name: "type",
              value: formData.type,
              onChange: handleChange,
              type: "text",
              placeholder: "Public/Private/International"
            })]
          }), /* @__PURE__ */ jsxs(FormSpacer, {
            children: [/* @__PURE__ */ jsx(Label, {
              text: "Fees per term"
            }), /* @__PURE__ */ jsx(Input, {
              name: "fee",
              value: formData.fee,
              onChange: handleChange,
              type: "text",
              placeholder: "School fee per term"
            })]
          }), /* @__PURE__ */ jsxs(FormSpacer, {
            children: [/* @__PURE__ */ jsx(Label, {
              text: "Contact\n              Details"
            }), /* @__PURE__ */ jsx(Input, {
              name: "contact",
              value: formData.contact,
              onChange: handleChange,
              type: "text",
              placeholder: "Number or email adress"
            })]
          }), /* @__PURE__ */ jsxs(FormSpacer, {
            children: [/* @__PURE__ */ jsx(Label, {
              text: "School system"
            }), /* @__PURE__ */ jsx(Input, {
              name: "system",
              value: formData.system,
              onChange: handleChange,
              type: "text",
              placeholder: "CBC ,  8-4-4 etc.."
            })]
          }), /* @__PURE__ */ jsx("button", {
            className: "bg-blue-500 text-white p-[10px] rounded-[10px] font-extralight w-full mt-6 hover:bg-white hover:text-black hover:cursor-pointer hover:transition-colors hover:duration-[0.3s] hover:border duration-[0.2s]",
            type: "submit",
            disabled: isSubmitting,
            children: isSubmitting ? "Creating school.." : "Add your school"
          })]
        })]
      })]
    })]
  });
});
function Label({
  htmlFor,
  text
}) {
  return /* @__PURE__ */ jsx("label", {
    className: "lg:text-[20px]",
    htmlFor,
    children: text
  });
}
function Input({
  name,
  type,
  placeholder,
  value,
  onChange,
  required
}) {
  return /* @__PURE__ */ jsx("input", {
    value,
    onChange,
    required,
    className: "p-[10px] rounded-[10px] bg-transparent border lg:w-[300px] ",
    type,
    name,
    placeholder
  });
}
function FormSpacer({
  children
}) {
  return /* @__PURE__ */ jsx("div", {
    className: "flex flex-col gap-[5px]",
    children
  });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  FormSpacer,
  Input,
  Label,
  default: listing
}, Symbol.toStringTag, { value: "Module" }));
const school$1 = UNSAFE_withComponentProps(function School() {
  const [singleSchool, setSingleSchool] = useState(null);
  const {
    id
  } = useParams();
  useEffect(() => {
    if (!id) return;
    const fetchSingleSchool = async () => {
      try {
        const backendUrl2 = void 0;
        const response = await fetch(`${backendUrl2}/api/schools/${id}`);
        const data = await response.json();
        console.log("Success school was  fetched");
        setSingleSchool(data);
      } catch (error) {
        console.log("There was an error with geting the school", error.message);
      }
    };
    fetchSingleSchool();
  }, [id]);
  return /* @__PURE__ */ jsxs("main", {
    className: "bg-[#fbf4da] h-full p-[10px] w-screen",
    children: [/* @__PURE__ */ jsxs("button", {
      onClick: () => window.history.back(),
      className: "flex items-center gap-2 bg-white/80 hover:bg-white rounded-full px-4 py-2 shadow transition hover:cursor-pointer hover:scale-[1.05] hover:transition-all hover:duration-[0.3s] duration-[0.4s]",
      "aria-label": "Go back",
      children: [/* @__PURE__ */ jsx("svg", {
        className: "w-5 h-5 text-blue-600",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        viewBox: "0 0 24 24",
        children: /* @__PURE__ */ jsx("path", {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M15 19l-7-7 7-7"
        })
      }), /* @__PURE__ */ jsx("span", {
        className: "text-blue-600 font-medium",
        children: "Back"
      })]
    }), /* @__PURE__ */ jsx("div", {
      className: "h-full lg:flex items-center justify-center w-screen",
      children: singleSchool ? /* @__PURE__ */ jsxs("div", {
        className: "text-black",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-[20px] text-center lg:text-[30px] mb-[30px]",
          children: singleSchool.data.name
        }), /* @__PURE__ */ jsx("img", {
          className: "rounded-[10px] w-[350px] lg:w-[700px] lg:justify-self-center",
          src: singleSchool.data.images[0],
          alt: ""
        }), /* @__PURE__ */ jsx("p", {
          className: "mt-[30px]",
          children: singleSchool.data.description
        }), /* @__PURE__ */ jsxs("ul", {
          className: "mt-[20px] flex flex-col justify-center gap-[10px]",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "flex items-center gap-[70px] lg:gap-[110px]",
            children: [/* @__PURE__ */ jsxs("p", {
              className: "bg-[#001822] text-white p-[10px] rounded-[10px]",
              children: ["Location :", " "]
            }), " ", ":", /* @__PURE__ */ jsx("p", {
              children: singleSchool.data.location
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex items-center gap-[30px] lg:gap-[40px]",
            children: [/* @__PURE__ */ jsxs("p", {
              className: "bg-[#001822] text-white p-[10px] rounded-[10px]",
              children: ["Education System :", " "]
            }), " ", ":", /* @__PURE__ */ jsx("p", {
              children: singleSchool.data.system
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex items-center gap-[30px] lg:gap-[35px]",
            children: [/* @__PURE__ */ jsxs("p", {
              className: "bg-[#001822] text-white p-[10px] rounded-[10px]",
              children: ["Current Population :", " "]
            }), ":", /* @__PURE__ */ jsxs("p", {
              children: [singleSchool.data.population, " Students"]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex items-center gap-[20px] lg:gap-[105px]",
            children: [/* @__PURE__ */ jsxs("p", {
              className: "bg-[#001822] text-white p-[10px] rounded-[10px]",
              children: ["Fee/Term :", " "]
            }), " ", ":", /* @__PURE__ */ jsx("p", {
              children: singleSchool.data.fee
            })]
          })]
        }), /* @__PURE__ */ jsxs("p", {
          className: "text-[20px] mt-[30px] lg:text-[30px]",
          children: ["Contact Details : ", singleSchool.data.contacts]
        }), /* @__PURE__ */ jsx("iframe", {
          className: "w-[350px]  rounded-[10px]",
          src: singleSchool.data.map,
          width: "600",
          height: "450",
          allowfullscreen: "",
          loading: "lazy",
          referrerpolicy: "no-referrer-when-downgrade"
        })]
      }) : /* @__PURE__ */ jsx("p", {
        className: "text-black",
        children: "Loading school data...."
      })
    })]
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: school$1
}, Symbol.toStringTag, { value: "Module" }));
const collection = UNSAFE_withComponentProps(function Saved() {
  return /* @__PURE__ */ jsx("main", {
    children: /* @__PURE__ */ jsx("div", {
      children: /* @__PURE__ */ jsx("h1", {
        children: "Here is where all the users items added into collection are displayed"
      })
    })
  });
});
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: collection
}, Symbol.toStringTag, { value: "Module" }));
function Dashboard() {
  return /* @__PURE__ */ jsxs("main", {
    className: "text-black flex items-center justify-center",
    children: [/* @__PURE__ */ jsx("nav", {
      className: "absolute top-6 left-6",
      children: /* @__PURE__ */ jsxs("button", {
        onClick: () => window.history.back(),
        className: "flex items-center gap-2 bg-white/80 hover:bg-white rounded-full px-4 py-2 shadow transition hover:cursor-pointer hover:scale-[1.05] hover:transition-all hover:duration-[0.3s] duration-[0.4s]",
        "aria-label": "Go back",
        children: [/* @__PURE__ */ jsx("svg", {
          className: "w-5 h-5 text-blue-600",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          viewBox: "0 0 24 24",
          children: /* @__PURE__ */ jsx("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M15 19l-7-7 7-7"
          })
        }), /* @__PURE__ */ jsx("span", {
          className: "text-blue-600 font-medium",
          children: "Back"
        })]
      })
    }), /* @__PURE__ */ jsx("style", {
      children: `
                    main {
                            min-height: 100vh;
                            width: 100vw;
                            background-image: url('/milad-fakurian-GJKx5lhwU3M-unsplash.jpg');
                            background-size: cover;
                            background-position: center;
                            background-repeat: no-repeat;
                            margin: 0;
                            padding: 0;
                    }
            `
    }), /* @__PURE__ */ jsxs("div", {
      className: "bg-white/80 rounded-2xl shadow-2xl p-10 max-w-2xl w-full flex flex-col items-center",
      children: [/* @__PURE__ */ jsxs("h1", {
        className: "lg:text-[30px] font-bold mb-4 text-center",
        children: ["User", " ", /* @__PURE__ */ jsx("span", {
          className: "text-blue-600 text-[20px] lg:text-[35px]",
          children: "Dashboard"
        })]
      }), /* @__PURE__ */ jsx("p", {
        className: "mb-8 text-gray-700 text-center",
        children: "Here is a list of schools you showed interest"
      }), /* @__PURE__ */ jsx("div", {
        className: "w-full",
        children: /* @__PURE__ */ jsxs("div", {
          className: "bg-blue-50 rounded-xl p-6 flex flex-col gap-4 shadow-inner",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "bg-white rounded-lg p-4 shadow flex items-center justify-between hover:shadow-md transition",
            children: [/* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("div", {
                className: "font-semibold text-lg",
                children: "Harvard University"
              }), /* @__PURE__ */ jsx("div", {
                className: "text-gray-500 text-sm",
                children: "Cambridge, MA"
              })]
            }), /* @__PURE__ */ jsx("button", {
              className: "bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 transition",
              children: "Remove"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "bg-white rounded-lg p-4 shadow flex items-center justify-between hover:shadow-md transition",
            children: [/* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("div", {
                className: "font-semibold text-lg",
                children: "Stanford University"
              }), /* @__PURE__ */ jsx("div", {
                className: "text-gray-500 text-sm",
                children: "Stanford, CA"
              })]
            }), /* @__PURE__ */ jsx("button", {
              className: "bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 transition",
              children: "Remove"
            })]
          })]
        })
      })]
    })]
  });
}
const dashboard = UNSAFE_withComponentProps(Dashboard);
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dashboard
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-CIYZnq49.js", "imports": ["/assets/chunk-NL6KNZEE-UgZfVOb5.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-BgHPmdEj.js", "imports": ["/assets/chunk-NL6KNZEE-UgZfVOb5.js"], "css": ["/assets/root-y4hr8mLs.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-ld4zs05Y.js", "imports": ["/assets/chunk-NL6KNZEE-UgZfVOb5.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/finding": { "id": "routes/finding", "parentId": "root", "path": "finding", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/finding-DaZO99ei.js", "imports": ["/assets/chunk-NL6KNZEE-UgZfVOb5.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/listing": { "id": "routes/listing", "parentId": "root", "path": "listing", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/listing-D3utmBs1.js", "imports": ["/assets/chunk-NL6KNZEE-UgZfVOb5.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/school": { "id": "routes/school", "parentId": "root", "path": "finding/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/school-D2Zy2PJA.js", "imports": ["/assets/chunk-NL6KNZEE-UgZfVOb5.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/collection": { "id": "routes/collection", "parentId": "root", "path": "/collection", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/collection-Bfn7w2bD.js", "imports": ["/assets/chunk-NL6KNZEE-UgZfVOb5.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/dashboard": { "id": "routes/dashboard", "parentId": "root", "path": "/dashboard", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/dashboard-BpZqF67e.js", "imports": ["/assets/chunk-NL6KNZEE-UgZfVOb5.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-26403c24.js", "version": "26403c24", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/finding": {
    id: "routes/finding",
    parentId: "root",
    path: "finding",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/listing": {
    id: "routes/listing",
    parentId: "root",
    path: "listing",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/school": {
    id: "routes/school",
    parentId: "root",
    path: "finding/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/collection": {
    id: "routes/collection",
    parentId: "root",
    path: "/collection",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/dashboard": {
    id: "routes/dashboard",
    parentId: "root",
    path: "/dashboard",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
