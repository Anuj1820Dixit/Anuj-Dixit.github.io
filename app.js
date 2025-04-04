const { useState, useEffect } = React;

function App() {
  const [contactNumber, setContactNumber] = useState("000-000-0000");
  const originalNumber = "123-456-7890";

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, 400);
    document.getElementById("globe-container").appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(2, 32, 32);
    const material = new THREE.MeshBasicMaterial({ wireframe: true, color: 0x00ff00 });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    camera.position.z = 5;

    const animate = function () {
      requestAnimationFrame(animate);
      globe.rotation.y += 0.002;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      document.getElementById("globe-container").innerHTML = "";
    };
  }, []);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setContactNumber(
        originalNumber
          .split("")
          .map((char, i) => (i <= index ? char : Math.floor(Math.random() * 10)))
          .join("")
      );
      if (index >= originalNumber.length) clearInterval(interval);
      index++;
    }, 100);
  }, []);

  return React.createElement("div", { className: "container" }, [
    React.createElement("h1", { key: "title" }, "The Data Whisperer"),
    React.createElement("p", { className: "bio", key: "bio" }, 
      "Most people see data as numbers. I see it as a language—a cryptic dialect spoken by the universe itself."
    ),
    React.createElement("div", { id: "globe-container", className: "globe", key: "globe" }),
    React.createElement("div", { className: "contact", key: "contact" }, [
      React.createElement("h2", {}, "Contact"),
      React.createElement("p", {}, contactNumber)
    ]),
    React.createElement("div", { className: "question-section", key: "question" }, [
      React.createElement("div", { className: "question-box" }, [
        React.createElement("h3", {}, "Data Whisperer brings a challenge for you..."),
        React.createElement("p", {}, "Which algorithm is best for anomaly detection in high-dimensional data?"),
        React.createElement("input", { type: "text", placeholder: "Your answer..." }),
        React.createElement("button", {}, "Submit")
      ])
    ])
  ]);
}

ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));
