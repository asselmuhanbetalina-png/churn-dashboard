import React from 'react'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  ComposedChart
} from 'recharts'
import { TrendingUp, TrendingDown, Target, DollarSign } from 'lucide-react'

const churnData = [
  { month: 'Февраль', actual: 5200000, plan: 4500000 },
  { month: 'Март', actual: 5400000, plan: 4500000 },
  { month: 'Апрель', actual: 5300000, plan: 4500000 },
  { month: 'Май (прогноз)', actual: null, plan: 5300000 }
]

const currentPlan = 4500000
const newPlan = 5300000
const avgActual = (5200000 + 5400000 + 5300000) / 3
const planIncrease = ((newPlan - currentPlan) / currentPlan * 100).toFixed(1)
const actualVsCurrentPlan = ((avgActual - currentPlan) / currentPlan * 100).toFixed(1)

function formatNumber(num) {
  return new Intl.NumberFormat('ru-KZ').format(num)
}

function App() {
  return (
    <div className="dashboard">
      <div className="header">
        <h1>📊 Дашборд оттока клиентов</h1>
        <p>Обоснование увеличения плана оттока до 5,300,000 тенге</p>
      </div>

      <div className="cards">
        <div className="card">
          <div className="card-title">Текущий план</div>
          <div className="card-value">{formatNumber(currentPlan)} ₸</div>
          <div className="card-subtitle">Действующий план</div>
        </div>

        <div className="card">
          <div className="card-title">Новый план</div>
          <div className="card-value highlight">{formatNumber(newPlan)} ₸</div>
          <div className="card-subtitle">Предлагаемый план</div>
        </div>

        <div className="card">
          <div className="card-title">Средний фактический отток</div>
          <div className="card-value positive">{formatNumber(avgActual)} ₸</div>
          <div className="card-subtitle">Февраль - Апрель 2026</div>
        </div>

        <div className="card">
          <div className="card-title">Увеличение плана</div>
          <div className="card-value positive">+{planIncrease}%</div>
          <div className="card-subtitle">{formatNumber(newPlan - currentPlan)} ₸</div>
        </div>

        <div className="card">
          <div className="card-title">Превышение текущего плана</div>
          <div className="card-value positive">+{actualVsCurrentPlan}%</div>
          <div className="card-subtitle">Факт vs Текущий план</div>
        </div>

        <div className="card">
          <div className="card-title">Отклонение от нового плана</div>
          <div className="card-value negative">-{((newPlan - avgActual) / newPlan * 100).toFixed(1)}%</div>
          <div className="card-subtitle">Новый план выше факта</div>
        </div>
      </div>

      <div className="chart-container">
        <div className="chart-title">Сравнение фактического оттока с планами</div>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={churnData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
            <Tooltip 
              formatter={(value) => [formatNumber(value), '']}
              contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
            />
            <Legend />
            <Bar dataKey="actual" name="Фактический отток" fill="#667eea" />
            <Line 
              dataKey="plan" 
              name="Текущий план" 
              stroke="#ef4444" 
              strokeWidth={3}
              strokeDasharray="5 5"
              dot={{ fill: '#ef4444', r: 6 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container">
        <div className="chart-title">Динамика оттока по месяцам</div>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={churnData.filter(d => d.actual !== null)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
            <Tooltip 
              formatter={(value) => [formatNumber(value), '']}
              contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="actual" 
              name="Фактический отток" 
              stroke="#10b981" 
              strokeWidth={4}
              dot={{ fill: '#10b981', r: 8 }}
              activeDot={{ r: 10 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="summary">
        <h3>📋 Обоснование увеличения плана</h3>
        <div className="summary-item">
          <span className="summary-label">Средний фактический отток (3 месяца)</span>
          <span className="summary-value">{formatNumber(avgActual)} ₸</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Превышение текущего плана</span>
          <span className="summary-value increase">+{formatNumber(avgActual - currentPlan)} ₸ (+{actualVsCurrentPlan}%)</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Новый план оттока</span>
          <span className="summary-value">{formatNumber(newPlan)} ₸</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Разница между новым планом и средним фактом</span>
          <span className="summary-value decrease">{formatNumber(newPlan - avgActual)} ₸</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Рекомендация</span>
          <span className="summary-value increase">Утвердить новый план</span>
        </div>
      </div>
    </div>
  )
}

export default App
