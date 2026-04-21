# 📊 AI Data Insights SaaS — Collaborative Breakdown (2 Developers)

## 👥 Equal Division Rule — *Everyone does everything*

* Both developers contribute to **backend, frontend, and AI**
* Tasks are split by **feature**, not by role
* Continuous **integration + code review**
* **Shared ownership** of the entire codebase

---

# 🧩 PHASE 1: File Upload + Basic Server

**Estimated duration:** 1 week

---

## 👤 Developer A

**Task:** API + File Handling
**Description:**

* Build FastAPI server
* Implement `/upload` endpoint
* Handle file storage
* Validate CSV files

⚠️ Requirements:

* File size validation
* MIME type checking
* Proper error handling

---

## 👤 Developer B

**Task:** Frontend Upload + Preview
**Description:**

* Build upload UI (React)
* Send file to backend
* Display preview (first rows)

⚠️ Requirements:

* Loading state
* Error handling UI
* Table rendering

---

## 🔁 Integration

* Connect frontend → backend
* Test with real CSV files
* Validate edge cases

✅ Expected result:

* File upload works
* CSV preview is displayed
* No crashes on invalid input

---

## 🧱 Classes / Structure

```python
# Developer A
class FileHandler:
    def __init__(self, file):
        self.file = file

    def validate(self):
        pass

    def save(self):
        pass

    def read_preview(self):
        pass
```

```python
# Shared
class Dataset:
    def __init__(self, dataframe):
        self.df = dataframe

    def get_preview(self):
        pass
```

---

# 📊 PHASE 2: Data Processing

**Estimated duration:** 1 week

---

## 👤 Developer A

**Task:** Data Analysis Core
**Description:**

* Load CSV into pandas
* Compute:

  * mean
  * median
  * null values
* Return structured JSON

---

## 👤 Developer B

**Task:** UI Dashboard (Stats)
**Description:**

* Display statistics in UI
* Build reusable components:

  * `StatCard`
  * `TableView`

---

## 🔁 Integration

* Define JSON contract together
* Handle non-numeric columns
* Sync backend output with UI

---

## 🧱 Classes

```python
class DataProcessor:
    def __init__(self, df):
        self.df = df

    def get_numeric_columns(self):
        pass

    def compute_stats(self):
        pass

    def handle_missing_values(self):
        pass
```

---

# 📈 PHASE 3: Visualization

**Estimated duration:** 1 week

---

## 👤 Developer A

**Task:** Chart Generation
**Description:**

* Generate:

  * histograms
  * correlation matrix
* Use matplotlib / seaborn / plotly

---

## 👤 Developer B

**Task:** Chart Rendering
**Description:**

* Integrate charts into frontend
* Dynamic rendering based on dataset

---

## 🔁 Integration

* Decide chart format (JSON vs image)
* Optimize performance for large datasets

---

## 🧱 Classes

```python
class ChartGenerator:
    def __init__(self, df):
        self.df = df

    def generate_histograms(self):
        pass

    def generate_correlation(self):
        pass
```

---

# 🤖 PHASE 4: AI Insights

**Estimated duration:** 1 week

---

## 👤 Developer A

**Task:** LLM Integration
**Description:**

* Generate dataset summaries using an LLM
* Build prompts with stats + metadata

---

## 👤 Developer B

**Task:** Insights UI
**Description:**

* Display AI-generated insights
* Add loading and retry states

---

## 🔁 Integration

* Tune prompts together
* Ensure meaningful outputs
* Handle API failures

---

## 🧱 Classes

```python
class InsightGenerator:
    def __init__(self, df, stats):
        self.df = df
        self.stats = stats

    def build_prompt(self):
        pass

    def generate_summary(self):
        pass
```

---

# 📉 PHASE 5: Predictions

**Estimated duration:** 1 week

---

## 👤 Developer A

**Task:** ML Model
**Description:**

* Train a simple regression model
* Automatically select target column

---

## 👤 Developer B

**Task:** Prediction UI
**Description:**

* Build input form
* Display prediction results

---

## 🔁 Integration

* Validate inputs
* Handle categorical data
* Align model expectations with UI

---

## 🧱 Classes

```python
class ModelTrainer:
    def __init__(self, df):
        self.df = df
        self.model = None

    def train(self):
        pass

    def predict(self, input_data):
        pass
```

---

# 📄 PHASE 6: Export & Finalization

**Estimated duration:** 1 week

---

## 👤 Developer A

**Task:** PDF Generation
**Description:**

* Generate report including:

  * statistics
  * charts
  * AI insights

---

## 👤 Developer B

**Task:** UX + Download
**Description:**

* Implement download button
* Improve UI/UX

---

## 🔁 Integration

* End-to-end testing
* Bug fixing
* Prepare deployment

---

## 🧱 Classes

```python
class ReportGenerator:
    def __init__(self, dataset, stats, charts, insights):
        self.dataset = dataset
        self.stats = stats
        self.charts = charts
        self.insights = insights

    def generate_pdf(self):
        pass
```

---

# ⚠️ Edge Cases (Must Handle)

* Empty CSV
* Invalid format
* Large files
* Non-numeric data
* Missing values
* Encoding issues

---

# 🔄 Workflow Rules

* Code review required for every feature
* No direct commits to `main`
* Use feature branches
* Test before merging

---

# ✅ Final Deliverable

* Fully working SaaS
* Complete pipeline:
  **Upload → Analyze → Visualize → Insights → Predict → Export**
* Deployed application
* Clean, modular, maintainable codebase

* a **GitHub project (issues + milestones)**
* or a **real folder architecture (frontend/backend)**
