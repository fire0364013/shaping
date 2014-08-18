package com.beauty.common.orm.hibernate3;

import java.io.Serializable;
import java.util.LinkedHashMap;
import java.util.List;

import javax.persistence.Entity;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.criterion.Criterion;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.beauty.common.page.QueryResult;
import com.beauty.common.utils.ReflectUtils;

/**
 * 扩展HibernateDaoSupport的泛型基类
 * 
 * @author
 * @param <T>
 *            实体类型
 */
@Repository
public class HibernateDao<T> extends HibernateDaoSupport {
	protected Class<T> entityClass;

	/**
	 * 在构造函数中利用反射机制获得参数T的具体类
	 */
	public HibernateDao() {
		entityClass = ReflectUtils.getClassGenricType(getClass());
	}

	/**
	 * 根据实体类与ID获得对象
	 * 
	 * @param clazz
	 *            实体类
	 * @param id
	 *            主键ID
	 */
	@SuppressWarnings("unchecked")
	public <X> X get(final Class<X> clazz, final Serializable id) {
		return (X) getSession().get(clazz, id);
	}

	/**
	 * 根据id获得对象
	 * 
	 * @param id
	 *            主键ID
	 */
	public T get(Serializable id) {
		return get(entityClass, id);
	}

	/**
	 * 删除对象
	 * 
	 * @param entity
	 *            实体类
	 */
	public void delete(final Object entity) {
		getSession().delete(entity);
	}

	/**
	 * 根据ID删除对象
	 * 
	 * @param id
	 *            主键ID
	 */
	public void delete(final Serializable id) {
		delete(get(id));
	}

	/**
	 * 根据实体类与ID删除对象
	 * 
	 * @param clazz
	 *            实体类
	 * @param id
	 *            主键ID
	 */
	@SuppressWarnings("unchecked")
	public void delete(final Class clazz, final Serializable id) {
		delete(get(clazz, id));
	}

	/**
	 * 保存对象
	 * 
	 * @param entity
	 *            保存的实体对象
	 */
	public void save(final Object entity) {
		getSession().saveOrUpdate(entity);
	}

	/**
	 * 获取所有数据
	 * 
	 * @param entityClass
	 *            参数T的反射类型
	 */
	@SuppressWarnings("unchecked")
	public <X> List<X> getAll(final Class<X> entityClass) {
		return createCriteria(entityClass).list();
	}

	/**
	 * 获取所有数据
	 */
	public List<T> getAll() {
		return query();
	}

	/**
	 * 根据条件获取数据
	 * 
	 * @param criterions
	 *            数量可变的Criterion
	 */
	@SuppressWarnings("unchecked")
	public List<T> query(final Criterion... criterions) {
		return createCriteria(criterions).list();
	}

	/**
	 * HQL方式查询
	 * 
	 * @param hql
	 *            符合HQL语法的查询语句
	 * @param values
	 *            数量可变的条件值,按顺序绑定
	 */
	public Query createQuery(final String hql, final Object... values) {
		Query query = super.getSession(true).createQuery(hql);

		int j = values.length;
		for (int i = 0; i < j; i++)
			query.setParameter(i, values[i]);
		return query;
	}

	/**
	 * HQL方式查询
	 * 
	 * @param hql
	 *            符合HQL语法的查询语句
	 * @param values
	 *            数量可变的条件值,按顺序绑定
	 */
	public Query createQuery(final String hql) {
		Query query = super.getSession(true).createQuery(hql);

		return query;
	}

	/**
	 * SQL方式查询
	 * 
	 * @param sql
	 *            符合SQL语法的查询语句
	 * @param values
	 *            数量可变的条件值,按顺序绑定
	 */
	public SQLQuery createSQLQuery(final String sql, final Object... values) {
		SQLQuery query = getSession().createSQLQuery(sql);

		if (values != null) {
			for (int i = 0; i < values.length; i++) {
				query.setParameter(i, values[i]);
			}
		}
		return query;
	}

	/**
	 * 根据类型创建查询对象
	 * 
	 * @param clazz
	 *            类型
	 */
	@SuppressWarnings("unchecked")
	public Criteria createCriteria(final Class clazz) {
		return getSession().createCriteria(clazz);
	}

	/**
	 * 对象化查询
	 * 
	 * @param entityClass
	 *            参数T的反射类型
	 * @param criterions
	 *            数量可变的Criterion
	 */
	@SuppressWarnings("unchecked")
	public Criteria createCriteria(final Class clazz,
			final Criterion... criterions) {
		Criteria criteria = getSession().createCriteria(clazz);
		for (Criterion c : criterions) {
			criteria.add(c);
		}
		return criteria;
	}

	/**
	 * 对象化查询
	 * 
	 * @param criterions
	 *            数量可变的Criterion
	 */
	public Criteria createCriteria(final Criterion... criterions) {
		return createCriteria(entityClass, criterions);
	}

	/**
	 * 设置参数值
	 * 
	 * @param params
	 *            参数值数组
	 */
	private static void setParameter(Query query, Object[] params) {
		if (params != null) {

			for (int i = 0; i < params.length; i++) {
				query.setParameter(i, params[i]);
			}
		}

	}

	/**
	 * 生成排序SQL
	 * 
	 * @param orderby
	 *            排序属性
	 */
	private static String buildOrderBy(LinkedHashMap<String, String> orderby) {
		StringBuilder sb = new StringBuilder();
		if (orderby != null && orderby.size() > 0) {
			sb.append(" order by ");
			for (String key : orderby.keySet()) {
				// sb.append("lower(o.").append(key).append(") ")
				sb.append(" o.").append(key).append(" ").append(
						orderby.get(key)).append(",");

			}
			sb.deleteCharAt(sb.length() - 1);
		}
		return sb.toString();
	}

	/**
	 * 生成排序SQL(原生)
	 * 
	 * @param orderby
	 *            排序属性
	 */
	private static String buildSqlOrderBy(LinkedHashMap<String, String> orderby) {
		StringBuilder sb = new StringBuilder();
		if (orderby != null && orderby.size() > 0) {
			sb.append(" order by ");
			for (String key : orderby.keySet()) {
				sb.append(key).append(" ").append(orderby.get(key)).append(",");
			}
			sb.deleteCharAt(sb.length() - 1);
		}
		return sb.toString();
	}

	/*
	 * 单个实体分页查询
	 * 
	 * @param startIndex 分页的起始位置从0开始
	 * 
	 * @param maxResult 每页显示的固定条数
	 * 
	 * @param whereJPQL 查询条件
	 * 
	 * @param params 参数值
	 * 
	 * @orderby 排序
	 * 
	 * @return QueryResult
	 */
	@SuppressWarnings("unchecked")
	// @Transactional(propagation=Propagation.NOT_SUPPORTED,readOnly=true)
	public QueryResult<T> getScrollData(int startIndex, int maxResult,
			String whereJPQL, Object[] params,
			LinkedHashMap<String, String> orderby) throws Exception {

		QueryResult<T> qr = new QueryResult<T>();
		String entityName = getEntityName(this.entityClass);
		String where = (whereJPQL != null && !"".equals(whereJPQL.trim())) ? "where "
				+ whereJPQL
				: "";
		Query query = getSession().createQuery(
				"select o from " + entityName + " o " + where
						+ buildOrderBy(orderby));

		setParameter(query, params);
		if (startIndex != -1 && maxResult != -1)
			query.setFirstResult(startIndex)// 设置分页的起始位置
					.setMaxResults(maxResult);// 设置每页显示的固定条数

		qr.setResultlist(query.list());

		query = getSession().createQuery(
				"select count(*) from " + entityName + " o " + where);

		setParameter(query, params);
		qr.setTotalrecord(new Long(query.uniqueResult().toString()));
		return qr;
	}

	/*
	 * 原生SQL分页查询或实体SQL分页查询
	 * 
	 * @param startIndex 分页的起始位置从0开始
	 * 
	 * @param maxResult 每页显示的固定条数
	 * 
	 * @param whereJPQL 查询条件
	 * 
	 * @param params 参数值
	 * 
	 * @orderby 排序
	 * 
	 * @return QueryResult
	 */
	@SuppressWarnings("unchecked")
	// @Transactional(propagation=Propagation.NOT_SUPPORTED,readOnly=true)
	public QueryResult<T> getScrollDataBySQL(int startIndex, int maxResult,
			String whereJPQL, Object[] params,
			LinkedHashMap<String, String> orderby) throws Exception {

		QueryResult<T> qr = new QueryResult<T>();
		String entityName = getEntityName(this.entityClass);
		String where = (whereJPQL != null && !"".equals(whereJPQL.trim())) ? "where "
				+ whereJPQL
				: "";
		SQLQuery query = getSession().createSQLQuery(
				"select * from " + entityName + " o " + where
						+ buildOrderBy(orderby));

		setParameter(query, params);
		if (startIndex != -1 && maxResult != -1)
			query.setFirstResult(startIndex)// 设置分页的起始位置
					.setMaxResults(maxResult);// 设置每页显示的固定条数

		qr.setResultlist(query.addEntity(this.entityClass).list());

		query = getSession().createSQLQuery(
				"select count(*) from " + entityName + " o " + where);

		setParameter(query, params);
		qr.setTotalrecord(new Long(query.uniqueResult().toString()));
		return qr;
	}

	/*
	 * 实体HQL分页查询
	 * 
	 * @param startIndex 分页的起始位置
	 * 
	 * @param maxResult 每页显示的记录数
	 * 
	 * @param searchField 所查询的实体属性
	 * 
	 * @param fromSQL 查询的实体名称
	 * 
	 * @param whereSQL 查询条件
	 * 
	 * @param params 参数值
	 * 
	 * @param orderby 排序字段
	 * 
	 * @return QueryResult
	 */
	// @Transactional(propagation=Propagation.NOT_SUPPORTED,readOnly=true)
	@SuppressWarnings("unchecked")
	public QueryResult<Object[]> getScrollDateByHQL(int startIndex,
			int maxResult, String searchField, String fromSQL, String whereSQL,
			Object[] params, LinkedHashMap<String, String> orderby)
			throws Exception {

		QueryResult<Object[]> qr = new QueryResult<Object[]>();

		Query query = null;
		String where = (whereSQL != null && !"".equals(whereSQL.trim())) ? " where "
				+ whereSQL
				: "";
		String nativeSQl = "select " + searchField + " from " + fromSQL + where
				+ buildSqlOrderBy(orderby);

		query = createQuery(nativeSQl, params);
		if (startIndex != -1 && maxResult != -1)
			query.setFirstResult(startIndex).setMaxResults(maxResult);
		qr.setResultlist(query.list());
		String countString = "";
		if (searchField.indexOf("distinct") != -1) {
			// String tmp = searchField.trim()+".*";
			// countString = "select count(*) from(select " + tmp + " from " +
			// fromSQL +where +" ) ";
			countString = "select " + searchField + " from " + fromSQL + where
					+ "  ";
			query = createQuery(countString, params);
			qr.setTotalrecord(query.list().size());
		} else {
			countString = "select count(*) from " + fromSQL + where;
			query = createQuery(countString, params);
			qr.setTotalrecord(new Long(query.uniqueResult().toString()));
		}
		// String countString = "select count(*) from " + fromSQL +where;
		// query = createQuery(countString, params);
		// qr.setTotalrecord(new Long(query.uniqueResult().toString()));
		return qr;
	}

	@SuppressWarnings("unchecked")
	public QueryResult<Object[]> getScrollDataByHQL(int startIndex,
			int maxResult, String searchField, String fromSQL, String whereSQL,
			Object[] params, LinkedHashMap<String, String> orderby)
			throws Exception {

		QueryResult<Object[]> qr = new QueryResult<Object[]>();

		Query query = null;
		String where = (whereSQL != null && !"".equals(whereSQL.trim())) ? " where "
				+ whereSQL
				: "";
		String nativeSQl = "select " + searchField + " from " + fromSQL + where
				+ buildSqlOrderBy(orderby);

		query = createQuery(nativeSQl, params);
		if (startIndex != -1 && maxResult != -1)
			query.setFirstResult(startIndex).setMaxResults(maxResult);
		qr.setResultlist(query.list());
		String countString = "";
		if (searchField.indexOf("distinct") != -1) {
			countString = "select " + searchField + " from " + fromSQL + where
					+ "  ";
			query = createQuery(countString, params);
			qr.setTotalrecord(query.list().size());
		} else {
			countString = "select count(*) from " + fromSQL + where;
			query = createQuery(countString, params);
			qr.setTotalrecord(new Long(query.uniqueResult().toString()));
		}
		return qr;
	}

	@SuppressWarnings("unchecked")
	public QueryResult<T> getEntityByHQL(String searchField, String fromSQL,
			String whereSQL, Object[] params,
			LinkedHashMap<String, String> orderby) throws Exception {

		QueryResult<T> qr = new QueryResult<T>();

		Query query = null;
		String where = (whereSQL != null && !"".equals(whereSQL.trim())) ? " where "
				+ whereSQL
				: "";
		String nativeSQl = "select " + searchField + " from " + fromSQL + where
				+ buildSqlOrderBy(orderby);

		query = createQuery(nativeSQl, params);

		qr.setResultlist(query.list());
		return qr;
	}

	@SuppressWarnings("unchecked")
	public QueryResult<T> getEntityByHQL(int startIndex, int maxResult,
			String searchField, String fromSQL, String whereSQL,
			Object[] params, LinkedHashMap<String, String> orderby)
			throws Exception {

		QueryResult<T> qr = new QueryResult<T>();

		Query query = null;
		String where = (whereSQL != null && !"".equals(whereSQL.trim())) ? " where "
				+ whereSQL
				: "";
		String nativeSQl = "select " + searchField + " from " + fromSQL + where
				+ buildSqlOrderBy(orderby);

		query = createQuery(nativeSQl, params);
		if (startIndex != -1 && maxResult != -1)
			query.setFirstResult(startIndex).setMaxResults(maxResult);
		qr.setResultlist(query.list());
		String countString = "";
		if (searchField.indexOf("distinct") != -1) {
			countString = "select " + searchField + " from " + fromSQL + where
					+ "  ";
			query = createQuery(countString, params);
			qr.setTotalrecord(query.list().size());
		} else {
			countString = "select count(*) from " + fromSQL + where;
			query = createQuery(countString, params);
			qr.setTotalrecord(new Long(query.uniqueResult().toString()));
		}
		return qr;
	}

	/*
	 * 原生SQL分页查询或实体SQL分页查询
	 * 
	 * @param startIndex 分页的起始位置
	 * 
	 * @param maxResult 每页显示的记录数
	 * 
	 * @param searchField 所查询的字段
	 * 
	 * @param fromSQL 查询的表
	 * 
	 * @param whereSQL 查询条件
	 * 
	 * @param params 参数值
	 * 
	 * @param orderby 排序字段
	 * 
	 * @return QueryResult
	 */
	@SuppressWarnings("unchecked")
	// @Transactional(propagation=Propagation.NOT_SUPPORTED,readOnly=true)
	public QueryResult<Object[]> getScrollDataByNativeSQL(int startIndex,
			int maxResult, String searchField, String fromSQL, String whereSQL,
			Object[] params, LinkedHashMap<String, String> orderby)
			throws Exception {

		QueryResult<Object[]> qr = new QueryResult<Object[]>();

		SQLQuery query = null;
		String where = (whereSQL != null && !"".equals(whereSQL.trim())) ? " where "
				+ whereSQL
				: "";
		String nativeSQl = "select " + searchField + " from " + fromSQL + where
				+ buildSqlOrderBy(orderby);

		query = createSQLQuery(nativeSQl, params);
		if (startIndex != -1 && maxResult != -1)
			query.setFirstResult(startIndex).setMaxResults(maxResult);
		qr.setResultlist(query.list());

		String countString = "";
		if (searchField.indexOf("distinct") != -1) {
			countString = "select " + searchField + " from " + fromSQL + where
					+ "  ";
			query = createSQLQuery(countString, params);
			qr.setTotalrecord(query.list().size());
		} else {
			countString = "select count(*) from " + fromSQL + where;
			query = createSQLQuery(countString, params);
			qr.setTotalrecord(new Long(query.uniqueResult().toString()));
		}
		return qr;
	}

	/*
	 * 原生SQL分页查询或实体SQL分页查询
	 * 
	 * @param startIndex 分页的起始位置
	 * 
	 * @param maxResult 每页显示的记录数
	 * 
	 * @param searchField 所查询的字段
	 * 
	 * @param fromSQL 查询的表
	 * 
	 * @param whereSQL 查询条件
	 * 
	 * @param params 参数值
	 * 
	 * @param orderby 排序字段
	 * 
	 * @return QueryResult
	 */
	@SuppressWarnings("unchecked")
	// @Transactional(propagation=Propagation.NOT_SUPPORTED,readOnly=true)
	public QueryResult<Object[]> getScrollDateByNativeSQL(int startIndex,
			int maxResult, String searchField, String fromSQL, String whereSQL,
			Object[] params, LinkedHashMap<String, String> orderby)
			throws Exception {

		QueryResult<Object[]> qr = new QueryResult<Object[]>();

		SQLQuery query = null;
		String where = (whereSQL != null && !"".equals(whereSQL.trim())) ? " where "
				+ whereSQL
				: "";
		String nativeSQl = "select " + searchField + " from " + fromSQL + where
				+ buildSqlOrderBy(orderby);

		query = createSQLQuery(nativeSQl, params);
		if (startIndex != -1 && maxResult != -1)
			query.setFirstResult(startIndex).setMaxResults(maxResult);
		qr.setResultlist(query.list());

		String countString = "";
		if (searchField.indexOf("distinct") != -1) {
			// String tmp = searchField.trim()+".*";
			// countString = "select count(*) from(select " + tmp + " from " +
			// fromSQL +where +" ) ";
			countString = "select " + searchField + " from " + fromSQL + where
					+ "  ";
			query = createSQLQuery(countString, params);
			qr.setTotalrecord(query.list().size());
		} else {
			countString = "select count(*) from " + fromSQL + where;
			query = createSQLQuery(countString, params);
			qr.setTotalrecord(new Long(query.uniqueResult().toString()));
		}
		// String countQueryString = "select count(*) from " + fromSQL +where;
		// query = createSQLQuery(countQueryString, params);
		// qr.setTotalrecord(new Long(query.uniqueResult().toString()));
		return qr;
	}

	/*
	 * 原生SQL分页查询或实体SQL分页查询
	 * 
	 * @param startIndex 分页的起始位置
	 * 
	 * @param maxResult 每页显示的记录数
	 * 
	 * @param searchField 所查询的字段
	 * 
	 * @param fromSQL 查询的表
	 * 
	 * @param whereSQL 查询条件
	 * 
	 * @param params 参数值
	 * 
	 * @param orderby 排序字段
	 * 
	 * @return QueryResult
	 */
	@SuppressWarnings("unchecked")
	@Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
	public QueryResult<Object[]> getScrollDataByXmlSQL(int startIndex,
			int maxResult, String SQL, Object[] params) throws Exception {

		QueryResult<Object[]> qr = new QueryResult<Object[]>();

		SQLQuery query = null;
		query = createSQLQuery(SQL, params);
		if (startIndex != -1 && maxResult != -1)
			query.setFirstResult(startIndex).setMaxResults(maxResult);
		qr.setResultlist(query.list());

		String countQueryString = "select count(*) from (" + SQL + " )";
		query = createSQLQuery(countQueryString, params);
		qr.setTotalrecord(new Long(query.uniqueResult().toString()));
		return qr;
	}

	// /////////////////////////////////////////////////////////////////////////
	/*
	 * 单个实体分页查询
	 * 
	 * @param startIndex 分页的起始位置从0开始
	 * 
	 * @param maxResult 每页显示的固定条数
	 * 
	 * @param whereJPQL 查询条件
	 * 
	 * @param params 参数值
	 * 
	 * @orderby 排序
	 * 
	 * @return QueryResult
	 */
	@SuppressWarnings("unchecked")
	// @Transactional(propagation=Propagation.NOT_SUPPORTED,readOnly=true)
	public QueryResult<T> getScrollDate(int startIndex, int maxResult,
			String whereJPQL, Object[] params,
			LinkedHashMap<String, String> orderby) throws Exception {

		QueryResult<T> qr = new QueryResult<T>();
		String entityName = getEntityName(this.entityClass);
		String where = (whereJPQL != null && !"".equals(whereJPQL.trim())) ? "where "
				+ whereJPQL
				: "";
		String hql = "select o from " + entityName + " o " + where
				+ buildOrderBy(orderby);
		Query query = getSession().createQuery(hql);

		setParameter(query, params);
		if (startIndex != -1 && maxResult != -1)
			query.setFirstResult(startIndex)// 设置分页的起始位置
					.setMaxResults(maxResult);// 设置每页显示的固定条数

		qr.setResultlist(query.list());

		query = getSession().createQuery(
				"select count(*) from " + entityName + " o " + where);

		setParameter(query, params);
		qr.setTotalrecord(new Long(query.uniqueResult().toString()));
		return qr;
	}

	/*
	 * 得到具体实体名
	 * 
	 * @param entityClass 具体类
	 */
	private static <E> String getEntityName(Class<E> entityClass) {
		String entityname = entityClass.getSimpleName();
		Entity entity = entityClass.getAnnotation(Entity.class);
		if (entity.name() != null && !"".equals(entity.name()))
			entityname = entity.name();
		return entityname;
	}

	/**
	 * 原生实体sql
	 * 
	 * @param em
	 * @param sql
	 * @param values
	 * @return
	 */
	public Query createNativeQuery(String sql, Object... values) {
		Query query = this.getSession().createQuery(sql);
		if (values != null) {
			for (int i = 0; i < values.length; i++) {
				query.setParameter(i, values[i]);
			}
		}
		return query;
	}

	/**
	 * 获得序列值
	 * 
	 * @param sequenceName
	 *            :序列名称 如角色表的序列是:"SEQ_ROLE"
	 * 
	 */
	public String getSequence(String sequenceName) {
		String str = "";
		try {
			Query query = getSession().createSQLQuery(
					"SELECT T.NEXTVALUE FROM SEQUENCE T WHERE T.SEQUENCETYPE='"
							+ sequenceName + "'");// super.createQuery("select lpad(SEQ_ROLE.nextval,16, '0') as getxh   from   dual",
													// values);
			str = query.list().get(0).toString();
			getSession()
					.createSQLQuery(
							"UPDATE  SEQUENCE T SET T.NEXTVALUE=T.NEXTVALUE+T.INDENTITYVALUE WHERE T.SEQUENCETYPE='"
									+ sequenceName + "'").executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return str;
	}

	/**
	 * 根据sql更新
	 * 
	 * @param values
	 * @return
	 */
	public int createUpdateBySQL(String hql, Object... values) {
		int flag = 0;
		try {
			Query query = createQuery(hql);
			for (int i = 0; i < values.length; i++) {
				query.setParameter(i, values[i]);
			}
			flag = query.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return flag;
	}

	/*
	 * 原生SQL分页查询或实体SQL分页查询
	 * 
	 * @param startIndex 分页的起始位置从0开始
	 * 
	 * @param maxResult 每页显示的固定条数
	 * 
	 * @param whereJPQL 查询条件
	 * 
	 * @param params 参数值
	 * 
	 * @orderby 排序
	 * 
	 * @return QueryResult
	 */
	@SuppressWarnings("unchecked")
	// @Transactional(propagation=Propagation.NOT_SUPPORTED,readOnly=true)
	public QueryResult<T> getScrollDateBySQL(int startIndex, int maxResult,
			String whereJPQL, Object[] params,
			LinkedHashMap<String, String> orderby) throws Exception {

		QueryResult<T> qr = new QueryResult<T>();
		String entityName = getEntityName(this.entityClass);
		String where = (whereJPQL != null && !"".equals(whereJPQL.trim())) ? "where "
				+ whereJPQL
				: "";
		SQLQuery query = getSession().createSQLQuery(
				"select * from " + entityName + " o " + where
						+ buildOrderBy(orderby));

		setParameter(query, params);
		if (startIndex != -1 && maxResult != -1)
			query.setFirstResult(startIndex)// 设置分页的起始位置
					.setMaxResults(maxResult);// 设置每页显示的固定条数

		qr.setResultlist(query.addEntity(this.entityClass).list());

		query = getSession().createSQLQuery(
				"select count(*) from " + entityName + " o " + where);

		setParameter(query, params);
		qr.setTotalrecord(new Long(query.uniqueResult().toString()));
		return qr;
	}
}