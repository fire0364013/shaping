package com.beauty.biz.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.beauty.biz.dao.SampleSourceDao;
import com.beauty.biz.entity.SampleSource;

@Service
@Transactional
public class SampleSourceManager {
	@Autowired
	private SampleSourceDao sampleSourceDao;

	/**
	 * 获得所有样品来源实体
	 */
	public List<SampleSource> getAllSampleSource() {
		return sampleSourceDao.getAll();
	}

	/**
	 * 获得样品来源实体
	 * 
	 * @param samplesourceid
	 *            实体id
	 */
	public SampleSource getSampleSource(String samplesourceid) {
		return sampleSourceDao.get(samplesourceid);
	}

}
