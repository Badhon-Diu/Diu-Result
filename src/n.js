const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { studentId, semester } = formData;
      const url = `http://software.diu.edu.bd:8006/result?grecaptcha=&semesterId=${semester}&studentId=${studentId}`;

      const response = await axios.get(url);

      //console.log("API Response:", response.data);
      setalldata(response.data);
      //let cgpaValue = response.data.cgpa;
     
      //setCgpa(cgpaValue)
      //console.log(cgpaValue)
      //console.log("here si your data", cgpaValue);
      // You can show response to user here if you want
    } catch (error) {
      console.error(
        "API Error:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  };